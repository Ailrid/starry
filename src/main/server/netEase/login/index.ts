import { Router } from 'express'
import * as loginQrCheck from './loginQrCheck.js'
import * as loginQrCreate from './loginQrCreate.js'
import * as loginQrKey from './loginQrKey.js'
import * as login_status from './loginStatus.js'
import * as logout from './logout.js'

const loginRouter: Router = Router()

const modules = [loginQrCheck, loginQrCreate, loginQrKey, login_status, logout]

// 统一注册
modules.forEach((m) => {
  if (m.apiUrl && m.handler) {
    loginRouter.all(m.apiUrl, m.handler) // 使用 .all 支持更多谓词
  }
})

export default loginRouter
