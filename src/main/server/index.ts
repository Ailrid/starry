export * from './cache'
export * from './components'
import { System, MessageWriter, Message } from '@virid/core'
import { InitStarryMessage, BootStrapElectronMessage } from '../init'
import { DatabaseComponent } from './components'
import Database from 'better-sqlite3'
import fs from 'fs'
import { join } from 'path'
import { app } from 'electron'

export class InitServerSystem {
  /*
   * 创建数据库
   */
  @System({
    priority: 1000,
    messageClass: InitStarryMessage
  })
  static initDatabase(dbComp: DatabaseComponent) {
    //获得文件夹路径
    const userDataPath = app.getPath('userData')
    const dbPath = join(userDataPath, 'music.db')
    const cacheFilesPath = join(userDataPath, 'cache_files')
    if (!fs.existsSync(cacheFilesPath)) {
      fs.mkdirSync(cacheFilesPath, { recursive: true })
    }

    // 绑定数据库
    dbComp.db = new Database(dbPath)
    dbComp.cachePath = cacheFilesPath

    // 初始化歌曲缓存表
    dbComp.db.exec(`
  CREATE TABLE IF NOT EXISTS song_cache (
    id INTEGER PRIMARY KEY,
    md5 TEXT,
    local_path TEXT,
    size INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_accessed_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)
    //初始化歌词缓存表
    dbComp.db.exec(`
  CREATE TABLE IF NOT EXISTS lyric_cache (
    id INTEGER PRIMARY KEY,
    lyrics_json TEXT,       
    is_pure INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

    // 初始化播放记录快照表
    dbComp.db.exec(`
  CREATE TABLE IF NOT EXISTS playback_snap (
    id INTEGER PRIMARY KEY DEFAULT 1,
    playlist_detail TEXT,   -- PlaylistDetail JSON
    songs_list TEXT,       -- SongDetail[]  JSON
    current_song TEXT,      -- SongDetail  JSON
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

    MessageWriter.info('[Express] Database: Database and Cache path bound successfully.')
  }
  /*
   * 启动服务器
   */
  @System({
    priority: 999
  })
  static initExpress(@Message(InitStarryMessage) message: InitStarryMessage) {
    const { server, port } = message
    server.listen(port, 'localhost', () => {
      //express已启动，开始创建窗口
      BootStrapElectronMessage.send(port)
      MessageWriter.info(`[Express] Bootstrap: Server listening on localhost:${port}`)
    })
  }
}
