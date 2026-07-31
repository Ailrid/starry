import { ExpressPlugin } from '@virid/express'
import {
  ArtistAlbumsSystem,
  ArtistDetailSystem,
  ArtistMvsSystem,
  ArtistSongsSystem,
  ArtistSubSystem,
  ArtistSublistSystem
} from './systems'
import {
  ArtistAlbumRequestMessage,
  ArtistMvRequestMessage,
  ArtistDetailRequestMessage,
  ArtistSongsRequestMessage,
  ArtistSubRequestMessage,
  ArtistSublistRequestMessage
} from './message'
export function ArtistSystemsBunch(plugin: ExpressPlugin) {
  plugin.bindRoute(ArtistAlbumRequestMessage)
  plugin.bindRoute(ArtistMvRequestMessage)
  plugin.bindRoute(ArtistDetailRequestMessage)
  plugin.bindRoute(ArtistSongsRequestMessage)
  plugin.bindRoute(ArtistSubRequestMessage)
  plugin.bindRoute(ArtistSublistRequestMessage)
  plugin.register(ArtistAlbumsSystem.getArtistAlbums)
  plugin.register(ArtistDetailSystem.getArtistDetail)
  plugin.register(ArtistMvsSystem.getArtistMvs)
  plugin.register(ArtistSongsSystem.getArtistSongs)
  plugin.register(ArtistSubSystem.subscribeArtist)
  plugin.register(ArtistSublistSystem.getArtistSublist)
}
