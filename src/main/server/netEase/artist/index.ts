import { Router } from 'express'
import * as artistAlbum from './artistAlbum.js'
import * as artistMv from './artistMv.js'
import * as artistSong from './artistSong.js'
import * as artistSub from './artistSub.js'
import * as artistSublist from './artistSublist.js'
import * as artists from './artists.js'

const artistRouter: Router = Router()

const modules = [artistAlbum, artistMv, artistSong, artistSub, artistSublist, artists]

// 统一注册
modules.forEach((m) => {
  if (m.apiUrl && m.handler) {
    artistRouter.all(m.apiUrl, m.handler) // 使用 .all 支持更多谓词
  }
})

export default artistRouter
