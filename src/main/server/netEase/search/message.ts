import { HttpRoute, HttpRequestMessage } from '@virid/express'
@HttpRoute({
  path: '/netease/search/detail',
  method: 'post'
})
export class SearchRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/search/suggest',
  method: 'post'
})
export class SearchSuggestRequestMessage extends HttpRequestMessage {}
