import { onMounted, onUnmounted, watch, computed, type WatchStopHandle } from 'vue'
// import { useRoute, useRouter } from 'vue-router'
import { container } from './ioc'
export const VUE_INJECT_KEY = Symbol('VUE_INJECT')
export const WATCH_METADATA_KEY = Symbol('WATCH_METADATA')
export const COMPUTED_METADATA_KEY = Symbol('COMPUTED_METADATA')

export function useController<T extends object>(token: any): T {
  const instance = container.get<T>(token)
  const proto = Object.getPrototypeOf(instance)

  //   // 注入 Router / Route
  //   const injectMap = Reflect.getMetadata(VUE_INJECT_KEY, proto)
  //   if (injectMap) {
  //     const router = useRouter()
  //     const route = useRoute()
  //     Object.entries(injectMap).forEach(([propKey, type]) => {
  //       Object.defineProperty(instance, propKey, {
  //         get: () => (type === 'router' ? router : route),
  //         enumerable: true,
  //         configurable: true
  //       })
  //     })
  //   }

  // 处理 @Computed
  const computedKeys: string[] = Reflect.getMetadata(COMPUTED_METADATA_KEY, proto)
  if (computedKeys) {
    computedKeys.forEach((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(proto, key)
      if (descriptor?.get) {
        // 核心：将原有的 get 逻辑包装进 Vue 的 computed
        const c = computed(() => descriptor.get!.call(instance))
        Object.defineProperty(instance, key, {
          get: () => c.value,
          enumerable: true,
          configurable: true
        })
      }
    })
  }

  // 处理 @Watch
  const watches: any[] = Reflect.getMetadata(WATCH_METADATA_KEY, proto)
  const stops: WatchStopHandle[] = []
  if (watches) {
    watches.forEach(({ sourceGetter, methodName, options }) => {
      // 绑定watch
      const stop = watch(
        () => sourceGetter(instance),
        (instance as any)[methodName].bind(instance),
        options
      )
      stops.push(stop)
    })
  }

  // 生命周期
  if (typeof (instance as any).onMounted === 'function') {
    onMounted(() => (instance as any).onMounted())
  }
  if (typeof (instance as any).onUnmounted === 'function') {
    // 核心：组件销毁时，切断所有监听器
    stops.forEach((stop) => stop())

    onUnmounted(() => (instance as any).onUnmounted())
  }

  return instance
}
