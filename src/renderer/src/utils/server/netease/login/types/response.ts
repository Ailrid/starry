/**
 * * 登陆检查
 */

export interface Timeout {
  code: 800
  message: '已过期'
}
export interface WaitScan {
  code: 801
  message: '等待扫码'
}
export interface Scaning {
  code: 802
  message: '扫码成功'
}

export interface LoginSuccess {
  code: 803
  message: '登录成功'
}

export interface TooManyRequest {
  code: -462
  message: '登录成功'
}
export type LoginQrCheckResponse = WaitScan | Scaning | LoginSuccess | Timeout | TooManyRequest

/**
 * * 创建登陆二维码
 */
export interface LoginQrCreateResponse {
  qrurl: string
  qrsvg: string
}

/**
 * * 创建登陆key
 */
export interface LoginQrKeyResponse {
  code: number
  unikey: string
}
export interface OpenLoginWindowResponse {
  code: 200 | 500 //成功或者窗口已存在
  message: string
}
export interface CloseLoginWindowResponse {
  code: 200 | 500
  message: string
}
