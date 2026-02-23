/*
 * @Author: ShirahaYuki  shirhayuki2002@gmail.com
 * @Date: 2026-01-07 16:23:28
 * @LastEditors: ShirahaYuki  shirhayuki2002@gmail.com
 * @LastEditTime: 2026-02-22 21:43:38
 * @FilePath: /starry/src/main/server/netEase/index.ts
 * @Description: 网易云音乐路由集合
 *
 * Copyright (c) 2026 by ShirahaYuki, All Rights Reserved.
 */
import { Router } from 'express'
import loginRouter from './login/index.js'
import playlistRouter from './playlist/index.js'
import othorRouter from './other/index.js'
import albumRouter from './album/index.js'
import artistRouter from './artist/index.js'
import userRouter from './user/index.js'
import songRouter from './song/index.js'
import searchRouter from './search/index.js'
const neteaseRouter: Router = Router()

const routers = [
  loginRouter,
  playlistRouter,
  othorRouter,
  albumRouter,
  artistRouter,
  userRouter,
  songRouter,
  searchRouter
]
// 统一注册
routers.forEach((r) => {
  neteaseRouter.use('/netease', r)
})

export default neteaseRouter
