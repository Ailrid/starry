import { Router } from 'express'
import * as userAccount from './userAccount.js'
import * as userDetail from './userDetail.js'
import * as userPlaylist from './userPlaylist.js'
import * as userRecord from './userRecord.js'
import * as userSubcount from './userSubcount.js'

const userRouter: Router = Router()

const modules = [userAccount, userDetail, userPlaylist, userRecord, userSubcount]

// 统一注册
modules.forEach((m) => {
  if (m.apiUrl && m.handler) {
    userRouter.all(m.apiUrl, m.handler) // 使用 .all 支持更多谓词
  }
})

export default userRouter
