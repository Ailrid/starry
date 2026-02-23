import { Router } from 'express'
import * as comment from './comment.js'
import * as mvdetail from './mvDetail.js'
import * as mvUrl from './mvUrl.js'
import * as personalFmMode from './personalFmMode.js'
import * as personalFm from './personalFm.js'
import * as recommendResource from './recommendPlaylist.js'
import * as recommendSongs from './recommendSong.js'
import * as ugcAlbumGet from './ugcAlbumGet.js'
import * as vipInfo from './vipInfo.js'
import * as intelligence from './intelligence.js'

const othorRouter: Router = Router()

const modules = [
  comment,
  mvdetail,
  mvUrl,
  personalFmMode,
  personalFm,
  recommendResource,
  recommendSongs,
  ugcAlbumGet,
  vipInfo,
  intelligence
]

// 统一注册
modules.forEach((m) => {
  if (m.apiUrl && m.handler) {
    othorRouter.all(m.apiUrl, m.handler) // 使用 .all 支持更多谓词
  }
})

export default othorRouter
