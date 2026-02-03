/*
 * @Author: ShirahaYuki  shirhayuki2002@gmail.com
 * @Date: 2026-02-03 10:00:24
 * @LastEditors: ShirahaYuki  shirhayuki2002@gmail.com
 * @LastEditTime: 2026-02-03 16:06:29
 * @FilePath: /starry/src/renderer/src/ccs/message/registry.ts
 * @Description:给消息的注册器，收集所有的system函数
 *
 * Copyright (c) 2026 by ShirahaYuki, All Rights Reserved.
 */
// ccs/message/registry.ts
import { MessageInternal } from './internal'
import { ErrorMessage } from './types'
import { MessageReader, MessageWriter } from './io'

export interface SystemTask {
  fn: () => any
  priority: number
}

/**
 * @description: 消息注册器 - 负责将系统函数与消息类型关联
 */
export class MessageRegistry {
  /**
   * 修复：直接使用 MessageInternal 的 Map，避免“平行时空”问题
   */
  static register(eventClass: any, systemFn: () => any, priority: number = 0) {
    const interestMap = MessageInternal.interestMap
    const systems = interestMap.get(eventClass) || []

    // 检查是否重复注册，防止同一个 System 被多次放入
    if (!systems.some((s) => s.fn === systemFn)) {
      systems.push({ fn: systemFn, priority })

      // 按优先级从大到小排序，确保调度时高优先级先执行
      systems.sort((a, b) => b.priority - a.priority)
      interestMap.set(eventClass, systems)
    }
  }

  static getHub() {
    return MessageInternal.eventHub
  }
}

/**
 * 注册全局默认错误处理系统
 */
MessageRegistry.register(ErrorMessage, () => {
  const errors = new MessageReader(ErrorMessage).read()
  errors.forEach((err) => {
    console.error(`[CCS Critical Error] [${err.context}]:`, err.error)
  })
})

/**
 * @description: 轻量级信号处理器定义
 * 支持任意参数，不能在信号中返回数据，以保持单向流
 */
export type SignalHandler = (...args: any[]) => void

export class Signal {
  // 单订阅模式：每个信号名对应一个唯一的处理器
  private static handlers = new Map<string, SignalHandler>()

  /**
   * @description: 注册信号处理器
   * @param name 信号标识符
   * @param handler 回调函数
   * @returns 卸载函数
   */
  static register(name: string, handler: SignalHandler): () => void {
    if (this.handlers.has(name)) {
      console.warn(`[CCS Signal] Signal '${name}' already has a handler. Overwriting...`)
    }

    this.handlers.set(name, handler)

    // 返回一个闭包用于卸载，防止组件销毁后依然残留引用
    return () => {
      if (this.handlers.get(name) === handler) {
        this.handlers.delete(name)
      }
    }
  }

  /**
   * @description: 呼叫信号（立即同步执行）
   * @param name 信号标识符
   * @param args 传递给处理器的任意参数
   */
  static call(name: string, ...args: any[]): void {
    const handler = this.handlers.get(name)

    if (!handler) {
      // 按照你的要求，使用现有的错误消息体系
      MessageWriter.error(
        new Error(`[CCS Signal] Called an unregistered signal: ${name}`),
        'SignalSystem'
      )
      return
    }

    try {
      handler(...args)
    } catch (e) {
      // 捕获处理器内部的执行错误
      MessageWriter.error(
        e instanceof Error ? e : new Error(String(e)),
        `[CCS Signal] SignalExecutionError:${name}`
      )
    }
  }

  /**
   * 全局清理，通常在游戏/应用关机时调用
   */
  static reset() {
    this.handlers.clear()
  }
}
