import { HttpRoute, HttpRequestMessage } from '@virid/express'
@HttpRoute({
  path: '/netease/login/window/open',
  method: 'post'
})
export class OpenLoginWindowRequestMessage extends HttpRequestMessage {}
@HttpRoute({
  path: '/netease/login/window/close',
  method: 'post'
})
export class CloseLoginWindowRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/login/qr/check',
  method: 'post'
})
export class LoginQrCheckRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/login/qr/create',
  method: 'post'
})
export class LoginQrCreateRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/login/qr/key',
  method: 'post'
})
export class LoginQrKeyRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/logout',
  method: 'post'
})
export class LogoutRequestMessage extends HttpRequestMessage {}
