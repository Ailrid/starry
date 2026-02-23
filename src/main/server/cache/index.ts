import { Router } from 'express'
import * as songUrl from './songUrl'
import * as songData from './songData'
import * as lyric from './lyric'

const modules = [songUrl, songData, lyric]
export const cacheRouter: Router = Router()
// 统一注册
modules.forEach((m) => {
  if (m.apiUrl && m.handler) {
    cacheRouter.all(m.apiUrl, m.handler)
  }
})
