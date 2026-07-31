import { ExpressPlugin } from '@virid/express'
import { AlbumDetailSystem, AlbumSubSystem, AlbumSublistSystem, AlbumWikiSystem } from './systems'
import {
  AlbumDetailRequestMessage,
  AlbumSubRequestMessage,
  AlbumSublistRequestMessage,
  AlbumWikiRequestMessage
} from './message'
export function AlbumSystemsBunch(plugin: ExpressPlugin) {
  plugin.bindRoute(AlbumDetailRequestMessage)
  plugin.bindRoute(AlbumSubRequestMessage)
  plugin.bindRoute(AlbumSublistRequestMessage)
  plugin.bindRoute(AlbumWikiRequestMessage)
  plugin.register(AlbumDetailSystem.getAlbumDetail)
  plugin.register(AlbumSubSystem.subscribeAlbum)
  plugin.register(AlbumSublistSystem.getSublist)
  plugin.register(AlbumWikiSystem.getAlbumWiki)
}
