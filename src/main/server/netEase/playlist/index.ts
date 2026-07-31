import { ExpressPlugin } from '@virid/express'
import {
  PlaylistCreateSystem,
  PlaylistDeleteSystem,
  PlaylistDetailSystem,
  PlaylistOrderUpdateSystem,
  PlaylistSongsSystem,
  PlaylistUpdateSystem
} from './systems'

import {
  PlaylistCreateRequestMessage,
  PlaylistDeleteRequestMessage,
  PlaylistDetailRequestMessage,
  PlaylistSongUpdateRequestMessage,
  PlaylistOrderUpdateRequestMessage,
  PlaylistUpdateRequestMessage
} from './message'
export function PlaylistSystemsBunch(plugin: ExpressPlugin) {
  plugin.bindRoute(PlaylistCreateRequestMessage)
  plugin.bindRoute(PlaylistDeleteRequestMessage)
  plugin.bindRoute(PlaylistDetailRequestMessage)
  plugin.bindRoute(PlaylistSongUpdateRequestMessage)
  plugin.bindRoute(PlaylistOrderUpdateRequestMessage)
  plugin.bindRoute(PlaylistUpdateRequestMessage)
  plugin.register(PlaylistCreateSystem.createPlaylist)
  plugin.register(PlaylistDeleteSystem.deletePlaylist)
  plugin.register(PlaylistDetailSystem.getPlaylistDetail)
  plugin.register(PlaylistOrderUpdateSystem.updatePlaylistOrder)
  plugin.register(PlaylistSongsSystem.handleSongs)
  plugin.register(PlaylistUpdateSystem.updatePlaylist)
}
