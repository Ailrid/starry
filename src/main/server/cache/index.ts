import { ExpressPlugin } from '@virid/express'
import { CacheLyricSystem, CacheSongDataSystem, CacheSongUrlSystem } from './systems'
import {
  CacheLyricRequestMessage,
  CacheSongDataRequestMessage,
  CacheSongUrlRequestMessage
} from './message'
import { ViridApp } from '@virid/core'
export function cacheSystemsBunch(app: ViridApp, plugin: ExpressPlugin) {
  plugin.bindRoute(CacheLyricRequestMessage)
  plugin.bindRoute(CacheSongDataRequestMessage)
  plugin.bindRoute(CacheSongUrlRequestMessage)

  app.register(CacheLyricSystem.cacheLyric)
  app.register(CacheSongDataSystem.clearCache)
  app.register(CacheSongDataSystem.downloadCache)

  plugin.register(CacheLyricSystem.lyric)
  plugin.register(CacheLyricSystem.lyricFromLocal)

  plugin.register(CacheSongDataSystem.songData)
  plugin.register(CacheSongDataSystem.songDataFromCache)
  plugin.register(CacheSongDataSystem.songDataFromLocal)
  plugin.register(CacheSongUrlSystem.songUrl)
  plugin.register(CacheSongUrlSystem.songUrlFromLocal)
}
