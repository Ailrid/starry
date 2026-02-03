/*
 * @Author: ShirahaYuki  shirhayuki2002@gmail.com
 * @Date: 2026-02-03 09:59:36
 * @LastEditors: ShirahaYuki  shirhayuki2002@gmail.com
 * @LastEditTime: 2026-02-03 14:03:22
 * @FilePath: /starry/src/renderer/src/ccs/message/io.ts
 * @Description:  消息读写器
 *
 * Copyright (c) 2026 by ShirahaYuki, All Rights Reserved.
 */
import { MessageInternal } from './internal'
import { BaseMessage, ErrorMessage } from './types'
/**
 * @description: 写入消息
 */

type ConstructorArgs<T> = T extends new (...args: infer P) => any ? P : never

export class MessageWriter {
  /**
   * 优雅版：支持直接传入类和参数
   * 使用：MessageWriter.write(ErrorMessage, e, 'Context')
   */
  public static write<T extends BaseMessage, K extends new (...args: any[]) => T>(
    MessageClass: K,
    ...args: ConstructorArgs<K>
  ): void

  /**
   * 兼容版：支持直接传入实例
   * 使用：MessageWriter.write(new ErrorMessage(e))
   */
  public static write<T extends BaseMessage>(instance: T): void

  public static write(target: any, ...args: any[]): void {
    const instance = typeof target === 'function' ? new target(...args) : target

    MessageInternal.pipeline(instance, () => {
      //把这个消息存到这一类的事件池里去
      MessageInternal.eventHub.push(instance)
      //标记这一类消息已经脏了
      MessageInternal.dispatcher.markDirty(instance)
      //下一时刻执行调度
      MessageInternal.dispatcher.tick(MessageInternal.interestMap)
    })
  }
  public static error(e: Error, context?: string): void {
    MessageWriter.write(ErrorMessage, e, context)
  }
}
/**
 * @description: 读取消息
 */
// ccs/message/index.ts
export class MessageReader<T extends BaseMessage> {
  constructor(public readonly eventClass: new (...args: any[]) => T) {}
  read(): T[] {
    return MessageInternal.eventHub.peek(this.eventClass)
  }
}
