/*
 * @Author: ShirahaYuki  shirhayuki2002@gmail.com
 * @Date: 2026-01-31 16:17:36
 * @LastEditors: ShirahaYuki  shirhayuki2002@gmail.com
 * @LastEditTime: 2026-02-05 15:26:09
 * @FilePath: /starry/src/renderer/src/ccs/decorators/ccs.ts
 * @Description: ccs核心魔法装饰器
 *
 * Copyright (c) 2026 by ShirahaYuki, All Rights Reserved.
 */
import { container } from '@/ccs/ioc'
import { MessageRegistry, BaseMessage, MessageWriter, ControllerMessage } from '../message'
import { CCS_METADATA } from '../constants'
import { injectable } from 'inversify'
import { CCSSystemContext, EventMessage, SingleMessage } from '../message/types'
/**
 * @description: 系统装饰器
 * @param priority 优先级，数值越大越早执行
 */
export function System(priority: number = 0) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    const types = Reflect.getMetadata('design:paramtypes', target, key) || []
    const readerConfigs: { index: number; eventClass: any; single: boolean }[] =
      Reflect.getMetadata(CCS_METADATA.MESSAGE, target, key) || []
    //不允许有多个Configs,只能由一种Message触发
    if (readerConfigs.length > 1) {
      MessageWriter.warn(
        `[CCS System] Multiple Messages Are Not Allowed: ${key} has multiple @Message() decorators!`
      )
      return
    }
    const wrappedSystem = function (currentMessage: any) {
      const args = types.map((type: any, index: number) => {
        // 先看看这个参数是不是标记过的Event
        const config = readerConfigs.find((c: any) => c.index === index)
        if (config) {
          const { eventClass, single } = config
          // 基础校验：判断当前投递的消息实例是否属于装饰器声明的类或其子类
          const sample = Array.isArray(currentMessage) ? currentMessage[0] : currentMessage
          if (!(sample instanceof eventClass)) {
            // 如果类型不匹配，说明 Dispatcher 路由逻辑或元数据配置有问题
            MessageWriter.error(
              new Error(
                `[CCS System] Type Mismatch: Expected ${eventClass.name}, but received ${sample?.constructor.name}`
              )
            )
            return null
          }
          // 处理 SingleMessage (合并且批处理类型)
          if (sample instanceof SingleMessage) {
            // 如果用户标记了 single: true，则只取最后一条（最新的一条）
            if (single) {
              return Array.isArray(currentMessage)
                ? currentMessage[currentMessage.length - 1]
                : currentMessage
            }
            // 否则默认返回整个数组（批处理模式）
            return Array.isArray(currentMessage) ? currentMessage : [currentMessage]
          }

          // 处理 EventMessage (顺序单发类型)
          if (sample instanceof EventMessage) {
            // Event 消息本身就是单体投递的，直接返回
            // 即便用户传了 single: true 也是它本身
            return currentMessage
          }

          // 回退处理（处理 BaseMessage 这种模糊基类）
          return currentMessage
        }
        // 处理普通的依赖注入
        const param = container.get(type)
        if (!param)
          MessageWriter.error(
            new Error(
              `[CCS System] Unkonw Inject Data Types: ${type.name} is not registered in the container!`
            )
          )
        return param
      })

      // 执行业务逻辑
      const result = originalMethod(...args)

      // 统一处理返回值：System 可以直接 return 一个消息来实现“链式反应”
      const handleResult = (res: any) => {
        if (!res) return
        const messages = Array.isArray(res) ? res : [res]
        messages.forEach((m) => {
          if (m instanceof BaseMessage) {
            MessageWriter.write(m)
          }
        })
      }

      return result instanceof Promise ? result.then(handleResult) : handleResult(result)
    }
    // 给包装后的函数挂载上下文信息（供 Dispatcher 读取）
    const taskContext: CCSSystemContext = {
      params: types,
      targetClass: target,
      methodName: key,
      originalMethod: originalMethod
    }
    ;(wrappedSystem as any).ccsContext = taskContext
    // 修改方法定义
    descriptor.value = wrappedSystem
    // 注册到调度中心：每个监听的消息类都要关联这个包装函数
    readerConfigs.forEach((config: any) => {
      MessageRegistry.register(config.eventClass, wrappedSystem, priority)
    })
  }
}

/**
 * @description: 标记参数为 MessageReader 并锁定其消息类型
 */
export function Message<T extends BaseMessage>(
  eventClass: new (...args: any[]) => T,
  single = true
) {
  return (target: any, key: string, index: number) => {
    const configs = Reflect.getMetadata(CCS_METADATA.MESSAGE, target, key) || []
    // 存储元数据：哪个参数索引，对应哪个消息类
    configs.push({ index, eventClass, single })
    Reflect.defineMetadata(CCS_METADATA.MESSAGE, configs, target, key)
  }
}
/**
 * @description: Listener 装饰器 - 标记 Controller 的成员方法为消息监听器
 * 模仿 Bevy 的即时响应机制，但严格限制其只能处理 UI 逻辑
 */
export function Listener<T extends ControllerMessage>(
  eventClass: new (...args: any[]) => T,
  priority: number = 0,
  single = true
) {
  return (target: any, propertyKey: string) => {
    // 获取该 Controller 原型上已有的监听器元数据
    const listeners = Reflect.getMetadata(CCS_METADATA.CONTROLLER_LISTENERS, target) || []

    // 存入当前方法的配置：哪个方法(propertyKey) 听 哪个消息(eventClass)
    listeners.push({
      propertyKey,
      eventClass,
      priority,
      single
    })

    // 将元数据重新定义回类原型，供 useController 在实例化时扫描
    Reflect.defineMetadata(CCS_METADATA.CONTROLLER_LISTENERS, listeners, target)
  }
}
/**
 * @description: 标记Controller身份
 */
export function Controller() {
  return (target: any) => {
    // 1. 依然要保持它可被依赖注入
    injectable()(target)
    // 2. 打上身份标签
    Reflect.defineMetadata(CCS_METADATA.CONTROLLER, true, target)
  }
}
/**
 * @description: 标记Component身份
 */
export function Component() {
  return (target: any) => {
    injectable()(target)
    // 打上组件标签
    Reflect.defineMetadata(CCS_METADATA.COMPONENT, true, target)
  }
}
