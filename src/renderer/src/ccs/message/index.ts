/*
 * @Author: ShirahaYuki  shirhayuki2002@gmail.com
 * @Date: 2026-02-01 15:32:13
 * @LastEditors: ShirahaYuki  shirhayuki2002@gmail.com
 * @LastEditTime: 2026-02-03 10:01:28
 * @FilePath: /starry/src/renderer/src/ccs/message/index.ts
 * @Description:
 *
 * Copyright (c) 2026 by ShirahaYuki, All Rights Reserved.
 */
// ccs/message/index.ts

import { MessageInternal } from './internal'
import { Middleware } from './types'

//  统一导出
export * from './types'
export * from './io'
export * from './registry'
export function useMiddleware(mw: Middleware) {
  MessageInternal.use(mw)
}
