import { HttpRoute, HttpRequestMessage } from '@virid/express'
@HttpRoute({
  path: '/netease/songs/comments',
  method: 'post'
})
export class SongCommentRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/songs/detail',
  method: 'post'
})
export class SongDetailRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/songs/like',
  method: 'post'
})
export class SongLikeRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/songs/like-check',
  method: 'post'
})
export class SongLikeCheckRequestMessage extends HttpRequestMessage {}
