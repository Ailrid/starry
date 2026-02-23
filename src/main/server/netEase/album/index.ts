import { Router } from 'express'
import * as albumSub from './albumSub.js'
import * as albumSublist from './albumSublist.js'
import * as album from './albumDetail.js'

const albumRouter: Router = Router()

const modules = [albumSub, albumSublist, album]

// 统一注册
modules.forEach((m) => {
  if (m.apiUrl && m.handler) {
    albumRouter.all(m.apiUrl, m.handler) // 使用 .all 支持更多谓词
  }
})

export default albumRouter
