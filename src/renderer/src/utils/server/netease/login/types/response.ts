/**
 * * 登陆检查
 */
export interface WaitScan {
  code: 801
  message: '等待扫码'
}
export interface Scaning {
  code: 200
  message: '登录成功'
}

export interface LoginSuccess {
  code: 200
  message: '登录成功'
}

export type LoginQrCheckResponse = WaitScan | Scaning | LoginSuccess

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
