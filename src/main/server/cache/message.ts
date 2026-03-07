import { HttpRoute, HttpRequestMessage } from '@virid/express'
@HttpRoute({
  path: '/cache/lyric',
  method: 'post'
})
export class CacheLyricRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/cache/songs/data',
  method: 'get'
})
export class CacheSongDataRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/cache/songs/url',
  method: 'post'
})
export class CacheSongUrlRequestMessage extends HttpRequestMessage {}
