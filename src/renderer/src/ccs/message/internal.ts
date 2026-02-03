/*
 * @Author: ShirahaYuki  shirhayuki2002@gmail.com
 * @Date: 2026-02-03 09:34:30
 * @LastEditors: ShirahaYuki  shirhayuki2002@gmail.com
 * @LastEditTime: 2026-02-03 13:22:24
 * @FilePath: /starry/src/renderer/src/ccs/message/internal.ts
 * @Description:消息系统内部维护的一些状态
 *
 * Copyright (c) 2026 by ShirahaYuki, All Rights Reserved.
 */
import { Dispatcher } from './dispatcher'
import { EventHub } from './eventHub'
import { BaseMessage, Middleware } from './types'
import { SystemTask } from './registry'
// ccs/message/index.ts

export class MessageInternal {
  static readonly eventHub = new EventHub()
  static readonly dispatcher = new Dispatcher()
  static readonly interestMap = new Map<any, SystemTask[]>()
  static readonly middlewares: Middleware[] = []

  static {
    // 把 Hub 的清理逻辑注入 Dispatcher
    this.dispatcher.setCleanupHook((snapshot) => {
      this.eventHub.clear(snapshot)
    })
  }

  static use(mw: Middleware) {
    this.middlewares.push(mw)
  }

  // 内部派发管道
  static pipeline(message: BaseMessage, finalAction: () => void) {
    let index = 0
    const next = () => {
      if (index < this.middlewares.length) {
        this.middlewares[index++](message, next)
      } else {
        finalAction()
      }
    }
    next()
  }
}
