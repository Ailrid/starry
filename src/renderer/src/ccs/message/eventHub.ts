/*
 * @Author: ShirahaYuki  shirhayuki2002@gmail.com
 * @Date: 2026-01-31 19:35:14
 * @LastEditors: ShirahaYuki  shirhayuki2002@gmail.com
 * @LastEditTime: 2026-02-03 13:45:48
 * @FilePath: /starry/src/renderer/src/ccs/message/eventHub.ts
 * @Description:消息管理中心
 *
 * Copyright (c) 2026 by ShirahaYuki, All Rights Reserved.
 */

/**
 * @description: 事件中心，存储和分发消息
 */
export class EventHub {
  // 当前正在被 System 读取的池子
  private activePool = new Map<any, any[]>()
  // 当前正在被 Writer 写入的池子
  private stagingPool = new Map<any, any[]>()

  /**
   * 写入永远只进 stagingPool，不影响正在运行的 System
   */
  push(event: any) {
    const type = event.constructor
    if (!this.stagingPool.has(type)) this.stagingPool.set(type, [])
    this.stagingPool.get(type)!.push(event)
  }

  /**
   * 读取永远从 activePool 读取
   */
  peek<T>(type: new (...args: any[]) => T): T[] {
    return this.activePool.get(type) || []
  }

  /**
   * 翻转缓冲区
   * 由 Dispatcher 在 queueMicrotask 开始时调用
   */
  flip() {
    // 将 staging 中的数据合并到 active 中，或者直接交换
    // 这里采用“追加合并”策略，确保上一个 Tick 没处理完的（如异步）能继续存在
    for (const [type, msgs] of this.stagingPool) {
      const activeMsgs = this.activePool.get(type) || []
      this.activePool.set(type, [...activeMsgs, ...msgs])
    }
    this.stagingPool.clear()
  }

  /**
   * 只清理 activePool 中已经被声明处理完的类型
   */
  clear(types: Set<any>) {
    types.forEach((type) => this.activePool.delete(type))
  }
  /**
   * 重置
   */
  reset() {
    this.activePool.clear()
    this.stagingPool.clear()
  }
}
