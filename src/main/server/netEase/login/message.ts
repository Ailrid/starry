import { HttpRoute, HttpRequestMessage } from '@virid/express'
@HttpRoute({
  path: '/netease/login/cellphone',
  method: 'post'
})
export class LoginCellphoneRequestMessage extends HttpRequestMessage {}
@HttpRoute({
  path: '/netease/login/captcha/sent',
  method: 'post'
})
export class SendCaptchaRequestMessage extends HttpRequestMessage {}
@HttpRoute({
  path: '/netease/login/captcha/verify',
  method: 'post'
})
export class VerifyCaptchaRequestMessage extends HttpRequestMessage {}

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
  path: '/netease/login/status',
  method: 'post'
})
export class LoginStatusRequestMessage extends HttpRequestMessage {}

@HttpRoute({
  path: '/netease/logout',
  method: 'post'
})
export class LogoutRequestMessage extends HttpRequestMessage {}
