import { HttpRoute, HttpRequestMessage } from '@virid/express'
@HttpRoute({
  path: '/cache/lyric',
  method: 'post'
})
export class CacheLyricRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/cache/songs/data',
  method: 'post'
})
export class CacheSongsDataRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/cache/songs/url',
  method: 'post'
})
export class CacheSongsUrlRequestMessage extends HttpRequestMessage {}
