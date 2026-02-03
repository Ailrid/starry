/*
 * @Author: ShirahaYuki  shirhayuki2002@gmail.com
 * @Date: 2026-02-03 10:00:24
 * @LastEditors: ShirahaYuki  shirhayuki2002@gmail.com
 * @LastEditTime: 2026-02-03 19:52:25
 * @FilePath: /starry/src/renderer/src/ccs/message/registry.ts
 * @Description:给消息的注册器，收集所有的system函数
 *
 * Copyright (c) 2026 by ShirahaYuki, All Rights Reserved.
 */
// ccs/message/registry.ts
import { MessageInternal } from './internal'
import { ErrorMessage } from './types'
import { MessageReader } from './io'

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
    console.error(`[CCS Error] Global Error Caught: [${err.context}]:`, err.error)
  })
})
