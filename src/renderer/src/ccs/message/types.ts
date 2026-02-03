/*
 * @Author: ShirahaYuki  shirhayuki2002@gmail.com
 * @Date: 2026-02-03 09:57:20
 * @LastEditors: ShirahaYuki  shirhayuki2002@gmail.com
 * @LastEditTime: 2026-02-03 19:33:05
 * @FilePath: /starry/src/renderer/src/ccs/message/types.ts
 * @Description:  消息类型定义
 *
 * Copyright (c) 2026 by ShirahaYuki, All Rights Reserved.
 */
import { MessageWriter } from './io'
import { Signal } from './signal'
export enum MessageStrategy {
  SIGNAL, // 可合并：一个 Tick 内无论发多少次，System 只执行一次
  EVENT // 不可合并：每一个消息实例都必须触发 System 执行
}

export abstract class BaseMessage {
  // 默认为 SIGNAL 模式
  static readonly strategy: MessageStrategy = MessageStrategy.SIGNAL
  static send<T extends typeof BaseMessage>(this: T, ...args: ConstructorParameters<T>) {
    MessageWriter.write(this as any, ...args)
  }
}

/**
 * 不可合并的消息基类
 */
export abstract class EventMessage extends BaseMessage {
  static override readonly strategy = MessageStrategy.EVENT
}

/**
 * 基础错误消息：天生不可合并，必须被精准捕获
 */
export class ErrorMessage extends EventMessage {
  constructor(
    public readonly error: Error,
    public readonly context?: string
  ) {
    super()
  }
}

export type Middleware = (message: BaseMessage, next: () => void) => void

/**
 * 基础信号：发后即忘 (Fire and Forget)
 */
export abstract class BaseSignal {
  static send<T extends typeof BaseSignal>(this: T, ...args: ConstructorParameters<T>): void {
    // 这里的 this 运行时就是具体的子类（如 NotifySignal）
    Signal.call(this as any, ...args)
  }
}

/**
 * 询问信号：必须有返回 (Request-Response)
 * T 是预期的返回类型
 */
export abstract class BaseRequest<T> {
  // 仅用于 TS 类型推导，运行时不占用空间
  readonly __returnType!: T

  /**
   * 同样支持静态 ask 调用，直接返回 Promise<T>
   */
  static ask<T extends typeof BaseRequest<any>>(
    this: T,
    ...args: ConstructorParameters<T>
  ): Promise<T extends typeof BaseRequest<infer R> ? R : never> {
    return Signal.ask(this as any, ...args)
  }
}
