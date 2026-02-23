/*
 * @Author: ShirahaYuki  shirhayuki2002@gmail.com
 * @Date: 2026-01-07 16:24:18
 * @LastEditors: ShirahaYuki  shirhayuki2002@gmail.com
 * @LastEditTime: 2026-02-22 21:55:14
 * @FilePath: /starry/src/main/server/netEase/search/index.ts
 * @Description: 搜索相关路由集合
 *
 * Copyright (c) 2026 by ShirahaYuki, All Rights Reserved.
 */
import { Router } from 'express'
import * as searchSuggest from './searchSuggest.js'
import * as search from './search.js'

const searchRouter: Router = Router()

const modules = [searchSuggest, search]

// 统一注册
modules.forEach((m) => {
  if (m.apiUrl && m.handler) {
    searchRouter.all(m.apiUrl, m.handler) // 使用 .all 支持更多谓词
  }
})

export default searchRouter
