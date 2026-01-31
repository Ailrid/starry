import 'reflect-metadata'
import type { WatchOptions } from 'vue'
import { container } from '@/core/ioc'
import { BaseMessage, MessageReader, EVENT_INTEREST_MAP } from '@/core/message'
import { VUE_INJECT_KEY, WATCH_METADATA_KEY, COMPUTED_METADATA_KEY } from './hooks'
/**
 * @Computed装饰器
 */
// decorators.ts
export function Computed(target: any, propertyKey: string, _descriptor: PropertyDescriptor) {
  const existing = Reflect.getMetadata(COMPUTED_METADATA_KEY, target) || []
  existing.push(propertyKey)
  Reflect.defineMetadata(COMPUTED_METADATA_KEY, existing, target)
}
/**
 * @Watch装饰器
 */
export function Watch<T>(sourceGetter: (instance: T) => any, options?: WatchOptions) {
  return (target: T, methodName: string, descriptor: PropertyDescriptor) => {
    if (typeof descriptor.value !== 'function') {
      throw new Error(`@Watch decorator can only be applied to methods.`)
    }

    // 依然需要记录元数据，以便 useController 在 setup 期间激活它
    const existing = Reflect.getMetadata(WATCH_METADATA_KEY, target as object) || []
    existing.push({
      sourceGetter, // 监听谁
      methodName, // 触发哪个函数
      options
    })
    Reflect.defineMetadata(WATCH_METADATA_KEY, existing, target as object)

    return descriptor
  }
}

// function createInjectDecorator(type: 'router' | 'route') {
//   return (target: any, propertyKey: string) => {
//     const metadata = Reflect.getMetadata(VUE_INJECT_KEY, target) || {}
//     metadata[propertyKey] = type
//     Reflect.defineMetadata(VUE_INJECT_KEY, metadata, target)
//   }
// }

// export const Router = () => createInjectDecorator('router')
// export const Route = () => createInjectDecorator('route')

/**
 * @description: 自动注入 Service 和 MessageReader 的系统装饰器
 */
export function System(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const types = Reflect.getMetadata('design:paramtypes', target, key) || []
  const readerConfigs = Reflect.getMetadata('message_type', target, key) || []

  const wrappedSystem = function () {
    const args = types.map((type: any, index: number) => {
      // 检查元数据，看这个位置是否需要注入 Reader
      const config = readerConfigs.find((c: any) => c.index === index)
      if (config) {
        return new MessageReader(config.eventClass)
      }
      // 否则从 DI 容器获取 Service
      return container.get(type)
    })
    return originalMethod.apply(target, args)
  }
  descriptor.value = wrappedSystem

  // 仅当有 MessageReader 参数时才注册到事件表里
  readerConfigs.forEach((config: any) => {
    const systems = EVENT_INTEREST_MAP.get(config.eventClass) || []
    // 只有当这个事件发生时，才需要跑这个 wrappedSystem
    if (!systems.includes(wrappedSystem)) {
      systems.push(wrappedSystem)
    }
    EVENT_INTEREST_MAP.set(config.eventClass, systems)
  })
}

/**
 * @description: 标记参数为 MessageReader 并锁定其消息类型
 */
export function Event<T extends BaseMessage>(eventClass: new (...args: any[]) => T) {
  return (target: any, key: string, index: number) => {
    const configs = Reflect.getMetadata('message_type', target, key) || []
    configs.push({ index, eventClass })
    Reflect.defineMetadata('message_type', configs, target, key)
  }
}
