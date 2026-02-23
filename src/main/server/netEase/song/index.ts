import { Router } from 'express'
import * as songComment from './songComment.js'
import * as songLikeCheck from './songLikeCheck.js'
import * as songLike from './songLike.js'
import * as songUrl from './songUrl.js'

const songRouter: Router = Router()

const modules = [songComment, songLikeCheck, songLike, songUrl]

// 统一注册
modules.forEach((m) => {
  if (m.apiUrl && m.handler) {
    songRouter.all(m.apiUrl, m.handler) // 使用 .all 支持更多谓词
  }
})

export default songRouter
