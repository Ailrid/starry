import { HttpRoute, HttpRequestMessage } from '@virid/express'
@HttpRoute({
  path: '/netease/artists/albums',
  method: 'post'
})
export class ArtistAlbumRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/artists/mvs',
  method: 'post'
})
export class ArtistMvRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/artists/detail',
  method: 'post'
})
export class ArtistDetailRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/artists/songs',
  method: 'post'
})
export class ArtistSongsRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/artists/sub',
  method: 'post'
})
export class ArtistSubRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/artists/sublist',
  method: 'post'
})
export class ArtistSublistRequestMessage extends HttpRequestMessage {}
