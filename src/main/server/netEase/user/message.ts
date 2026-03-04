import { HttpRoute, HttpRequestMessage } from '@virid/express'
@HttpRoute({
  path: '/netease/users/account',
  method: 'post'
})
export class UserAccountRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/users/detail',
  method: 'post'
})
export class UserDetailRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/users/playlists',
  method: 'post'
})
export class UserPlaylistRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/users/records',
  method: 'post'
})
export class UserRecordRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/users/subcount',
  method: 'post'
})
export class UserSubCountRequestMessage extends HttpRequestMessage {}
