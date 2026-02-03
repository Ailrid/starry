/*
 * @Author: ShirahaYuki  shirhayuki2002@gmail.com
 * @Date: 2026-02-01 16:02:19
 * @LastEditors: ShirahaYuki  shirhayuki2002@gmail.com
 * @LastEditTime: 2026-02-03 18:18:54
 * @FilePath: /starry/src/renderer/src/ccs/message/dispatcher.ts
 * @Description:事件调度中心
 *
 * Copyright (c) 2026 by ShirahaYuki, All Rights Reserved.
 */
/**
 * @description: 事件调度器
 */
// ccs/message/dispatcher.ts
// ccs/message/dispatcher.ts
import { MessageWriter } from '.'
import { MessageStrategy } from './types'
import { SystemTask } from './registry'
import { MessageInternal } from './internal'

export class Dispatcher {
  private dirtySignals = new Set<any>()
  private eventQueue: any[] = []
  private isRunning = false
  private tickCount = 0 // 计数器：防止死循环
  private cleanupHook: (types: Set<any>) => void = () => {}

  public setCleanupHook(hook: (types: Set<any>) => void) {
    this.cleanupHook = hook
  }

  public markDirty(message: any) {
    //根据消息类型，判断是事件还是信号？
    const strategy = (message.constructor as any).strategy ?? MessageStrategy.SIGNAL
    if (strategy === MessageStrategy.EVENT) {
      // 事件的话，每个都要执行，不能去重
      this.eventQueue.push(message)
    } else {
      // 消息的话，可以合并
      this.dirtySignals.add(message.constructor)
    }
  }
  public tick(interestMap: Map<any, SystemTask[]>) {
    if (this.isRunning || (this.dirtySignals.size === 0 && this.eventQueue.length === 0)) return

    // 如果单帧内递归超过 100 次，强制切断并报错，防止卡死
    if (this.tickCount > 100) {
      this.tickCount = 0
      //强制清空所有缓冲
      MessageInternal.eventHub.reset()
      MessageWriter.error(
        new Error('[CCS Dispatcher] Frequency Too High: Recursive event loop detected. Aborting.')
      )
      return
    }

    this.isRunning = true
    this.tickCount++

    queueMicrotask(async () => {
      //执行之前，交换缓冲区
      MessageInternal.eventHub.flip()
      // 给不同的处理方式
      const signalSnapshot = new Set(this.dirtySignals)
      const eventSnapshot = [...this.eventQueue]
      this.dirtySignals.clear()
      this.eventQueue = []

      try {
        const taskMap = new Map<() => any, number>()

        // 收集需要运行的系统
        const collect = (type: any) => {
          interestMap.get(type)?.forEach((task) => {
            const currentPrio = taskMap.get(task.fn) ?? -Infinity
            if (task.priority > currentPrio) {
              taskMap.set(task.fn, task.priority)
            }
          })
        }

        signalSnapshot.forEach((type) => collect(type))
        eventSnapshot.forEach((msg) => collect(msg.constructor))

        // 排序执行
        const sortedTasks = [...taskMap.entries()].sort((a, b) => b[1] - a[1]).map(([fn]) => fn)

        const asyncTasks: Promise<any>[] = []

        for (const run of sortedTasks) {
          try {
            const result = run()
            if (result instanceof Promise) {
              asyncTasks.push(
                result.catch((e) =>
                  MessageWriter.error(
                    e,
                    `[CCS Dispatcher] Sysytem Run Failed: AsyncSystem Execution Error,System Name ${run.name}`
                  )
                )
              )
            }
          } catch (e) {
            MessageWriter.error(
              e as Error,
              `[CCS Dispatcher] Sysytem Run Failed: SyncSystem Execution Error,System Name ${run.name}`
            )
          }
        }

        if (asyncTasks.length > 0) {
          // 这里的 await 确保了异步系统在 cleanup 之前能读到数据
          await Promise.allSettled(asyncTasks)
        }

        // 清理 Hub
        const allProcessedTypes = new Set(signalSnapshot)
        eventSnapshot.forEach((msg) => allProcessedTypes.add(msg.constructor))
        this.cleanupHook(allProcessedTypes)
      } finally {
        this.isRunning = false
        // 递归检查
        if (this.dirtySignals.size > 0 || this.eventQueue.length > 0) {
          this.tick(interestMap)
        } else {
          this.tickCount = 0 // 只有彻底跑完才清零计数器
        }
      }
    })
  }
}
