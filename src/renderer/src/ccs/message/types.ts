/*
 * @Author: ShirahaYuki  shirhayuki2002@gmail.com
 * @Date: 2026-02-03 09:57:20
 * @LastEditors: ShirahaYuki  shirhayuki2002@gmail.com
 * @LastEditTime: 2026-02-05 12:54:43
 * @FilePath: /starry/src/renderer/src/ccs/message/types.ts
 * @Description:  消息类型定义
 *
 * Copyright (c) 2026 by ShirahaYuki, All Rights Reserved.
 */
import { Newable } from 'inversify'
import { MessageWriter } from './io'
type AnyConstructor = abstract new (...args: any[]) => any
export abstract class BaseMessage {
  static send<T extends AnyConstructor>(this: T, ...args: ConstructorParameters<T>) {
    // 实例化并传递给 Writer
    // 注意：这里需要根据你的 MessageWriter.write 实现来决定是传类还是传实例
    MessageWriter.write(this as any, ...args)
  }
  public senderInfo?: {
    fileName: string
    line: number
    timestamp: number
  }

  constructor() {
    // 仅在开发模式下开启，避免生产环境性能损耗
    if (process.env.NODE_ENV === 'development') {
      this.senderInfo = this.captureSender()
    }
  }
  private captureSender() {
    const stack = new Error().stack?.split('\n')
    // stack[0] 是 Error 本身
    // stack[1] 是 captureSender
    // stack[2] 是 BaseMessage 的构造函数
    // stack[3] 通常就是调用 MessageWriter.write 的地方
    const callerLine = stack?.[3] || ''
    // 用正则提取出 文件名:行号
    const match = callerLine.match(/\((.*):(\d+):(\d+)\)/)
    return {
      fileName: match ? match[1].split('/').pop()! : 'unknown',
      line: match ? parseInt(match[2]) : 0,
      timestamp: Date.now()
    }
  }
}
/**
 * 可合并的信号基类
 */
export abstract class SingleMessage extends BaseMessage {
  // @ts-ignore 只用来区分的标识符
  private readonly __kind = 'SingleMessage' as const
  constructor() {
    super()
  }
}

/**
 * 不可合并的消息基类
 */
export abstract class EventMessage extends BaseMessage {
  // @ts-ignore 只用来区分的标识符
  private readonly __kind = 'EventMessage' as const
  constructor() {
    super()
  }
}

/**
 * 基础错误消息：不可合并，必须被精准捕获
 */
export class ErrorMessage extends EventMessage {
  constructor(
    public readonly error: Error,
    public readonly context?: string
  ) {
    super()
  }
}
/**
 * 基础警告消息：不可合并，必须被精准捕获
 */
export class WarnMessage extends EventMessage {
  constructor(public readonly context: string) {
    super()
  }
}

/**
 * 原子修改消息：不可合并，带上组件类型、修改逻辑和语义标签
 */
export class AtomicModifyMessage<T> extends EventMessage {
  constructor(
    public readonly ComponentClass: Newable<T>, // 你要改哪个组件？
    public readonly recipe: (comp: T) => void, // 你打算怎么改？
    public readonly label: string // 为什么要改？
  ) {
    super()
  }
}

/**
 * 的基类
 */
export abstract class ControllerMessage extends SingleMessage {}

export type Middleware = (message: BaseMessage, next: () => void) => void

// 修改 Hook 定义，增加对基类的处理逻辑
export type Hook<T extends BaseMessage> = (
  message: [BaseMessage] extends [T]
    ? SingleMessage[] | EventMessage // 如果是基类本身，可能是数组也可能是单体
    : T extends SingleMessage
      ? T[]
      : T,
  context: CCSSystemContext
) => void | Promise<void>

// 定义一个可以接受抽象类和普通类的类型
export type MessageIdentifier<T> =
  | (abstract new (...args: any[]) => T)
  | (new (...args: any[]) => T)

// 定义在 types.ts 中
export interface CCSSystemContext {
  params: any[] // 参数类型定义列表
  targetClass: any // System 所在的类
  methodName: string // 方法名
  originalMethod: (...args: any[]) => any
}

export interface SystemTask {
  fn: (...args: any[]) => any
  priority: number
}

/**
 * 核心逻辑：根据 T 的类型决定 Hook 接收的是数组还是单体
 */
export type MessagePayload<T> = T extends SingleMessage ? T[] : T extends EventMessage ? T : T | T[] // BaseMessage 可能是两者之一
