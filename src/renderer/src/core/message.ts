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

    queueMicrotask(() => {
      try {
        // 1. 找到所有受影响的系统（去重）
        const systemsToRun = new Set<() => void>()
        this.pendingTypes.forEach((type) => {
          const systems = EVENT_INTEREST_MAP.get(type)
          systems?.forEach((sys) => systemsToRun.add(sys))
        })

        // 2. 只运行这些受影响的系统
        systemsToRun.forEach((run) => run())

        // 3. 清理本次处理的类型记录
        this.pendingTypes.clear()
      } finally {
        this.isRunning = false
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
