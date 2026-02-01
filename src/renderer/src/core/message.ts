import log from 'electron-log/renderer'
// 系统表，记录所有的有MessageReader的系统,包含类型和执行函数
export const EVENT_INTEREST_MAP = new Map<any, Array<() => void>>()

class EventHub {
  private messages = new Map<any, any[]>()

  push(event: any) {
    const type = event.constructor
    if (!this.messages.has(type)) this.messages.set(type, [])
    this.messages.get(type)!.push(event)
  }

  pull<T>(type: new (...args: any[]) => T): T[] {
    const data = this.messages.get(type) || []
    this.messages.set(type, [])
    return data
  }
}

// 直接导出一个唯一的实例
const eventHub = new EventHub()

// 消息基类，方便管理
export abstract class BaseMessage {}

/**
 * @description: 事件调度器
 * @return {*}
 */
export class Dispatcher {
  private static pendingTypes = new Set<any>()
  private static isRunning = false

  /**
   * 标记某种类型的事件发生了，需要处理
   */
  static markDirty(eventClass: any) {
    this.pendingTypes.add(eventClass)
    this.tick()
  }

  static tick() {
    if (this.isRunning) return
    this.isRunning = true
    // 使用 async 包装，以便等待异步系统
    queueMicrotask(async () => {
      try {
        const systemsToRun = new Set<() => any>()
        this.pendingTypes.forEach((type) => {
          const systems = EVENT_INTEREST_MAP.get(type)
          systems?.forEach((sys) => systemsToRun.add(sys))
        })

        // 核心改动：使用 Promise.all 运行所有系统
        // 这样无论系统是同步还是异步，都会被妥善处理
        const results = Array.from(systemsToRun).map((run) => {
          try {
            return run() // 执行被 @System 包装后的 wrappedSystem
          } catch (e) {
            log.error('System execution error:', e)
            return Promise.resolve()
          }
        })
        // 等待所有异步系统完成
        await Promise.all(results)
        this.pendingTypes.clear()
      } catch (e) {
        log.error('Dispatcher critical error:', e)
        return Promise.resolve()
      } finally {
        this.isRunning = false

        // 如果在异步等待期间又有新消息进来，再次触发 tick
        if (this.pendingTypes.size > 0) {
          this.tick()
        }
      }
    })
  }
}

// 这里的核心：MessageReader 不再只是一个泛型类，它需要一个实体
export class MessageReader<T extends BaseMessage> {
  private hub: EventHub = eventHub
  constructor(public readonly eventClass: new (...args: any[]) => T) {}

  read(): T[] {
    return this.hub.pull(this.eventClass)
  }
}

export class MessageWriter {
  public static write<T extends BaseMessage>(message: T): void {
    const eventClass = message.constructor
    // 存入 Hub
    eventHub.push(message)
    // 触发调度器
    Dispatcher.markDirty(eventClass)
  }
}
