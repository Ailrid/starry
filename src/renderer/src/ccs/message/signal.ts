/*
 * @Author: ShirahaYuki  shirhayuki2002@gmail.com
 * @Date: 2026-02-03 19:26:09
 * @LastEditors: ShirahaYuki  shirhayuki2002@gmail.com
 * @LastEditTime: 2026-02-03 19:50:36
 * @FilePath: /starry/src/renderer/src/ccs/message/signal.ts
 * @Description: 信号系统
 *
 * Copyright (c) 2026 by ShirahaYuki, All Rights Reserved.
 */
// 定义一个内部持有的 Handler 类型，兼容同步和异步
import { BaseSignal, BaseRequest } from './types'
import { MessageWriter } from './io'
type AnyHandler = (...args: any[]) => any

export class Signal {
  private static handlers = new Map<any, AnyHandler>()

  /**
   * 注册处理器：现在要求传入类名作为 Key
   */
  static register<T extends BaseSignal | BaseRequest<any>>(
    SignalClass: new (...args: any[]) => T,
    handler: (instance: T) => T extends BaseRequest<infer R> ? R | Promise<R> : void
  ): () => void {
    if (this.handlers.has(SignalClass.name)) {
      MessageWriter.error(
        new Error(
          `[CCS Signal] Ambiguous Responder: ${SignalClass.name} is already handled. Signals must have a unique owner.`
        )
      )
    }
    const name = SignalClass.name
    this.handlers.set(name, handler)
    return () => {
      if (this.handlers.get(name) === handler) this.handlers.delete(name)
    }
  }

  /**
   * call: 处理通知类信号 (BaseSignal)
   */
  static call<T extends BaseSignal>(
    SignalClass: new (...args: any[]) => T,
    ...args: ConstructorParameters<new (...args: any[]) => T>
  ): void {
    const handler = this.handlers.get(SignalClass.name)
    if (!handler) {
      MessageWriter.error(new Error(`[CCS Signal] NO Handler: No handler for ${SignalClass.name}`))
      return
    }
    handler(new SignalClass(...args))
  }

  /**
   * ask: 处理询问类信号 (BaseRequest)
   * 自动推导 Promise 的返回值类型！
   */
  static async ask<R, T extends BaseRequest<R>>(
    RequestClass: new (...args: any[]) => T,
    ...args: ConstructorParameters<new (...args: any[]) => T>
  ): Promise<T extends typeof BaseRequest<infer R> ? R : never> {
    const handler = this.handlers.get(RequestClass.name)
    if (!handler) {
      const err = new Error(`[CCS Request] NO Handler: No handler for ${RequestClass.name}`)
      MessageWriter.error(err)
      throw err
    }
    // 执行并保证返回 Promise
    return Promise.resolve(handler(new RequestClass(...args)))
  }
}
