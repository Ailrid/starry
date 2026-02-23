import { Router } from 'express'
import * as playlistCreate from './playlistCreate.js'
import * as playlistDelete from './playlistDelete.js'
import * as playlistDetail from './playlistDetail.js'
import * as playlistOrderUpdate from './playlistOrderUpdate.js'
import * as playlistTracks from './playlistTracks.js'
import * as playlistUpdate from './playlistUpdate.js'
import * as playlistSongOrderUpdate from './playlistSongOrderUpdate.js'

const playlistRouter: Router = Router()

const modules = [
  playlistCreate,
  playlistDelete,
  playlistDetail,
  playlistOrderUpdate,
  playlistTracks,
  playlistUpdate,
  playlistSongOrderUpdate
]

// 统一注册
modules.forEach((m) => {
  if (m.apiUrl && m.handler) {
    playlistRouter.all(m.apiUrl, m.handler) // 使用 .all 支持更多谓词
  }
})

export default playlistRouter
