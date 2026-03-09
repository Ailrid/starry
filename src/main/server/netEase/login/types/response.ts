//-----------------------login_qr_check---------------------------------------------------
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
//-----------------------login_qr_create---------------------------------------------------
/**
 * * 创建登陆二维码
 */
export interface LoginQrCreateResponse {
  qrurl: string
  qrsvg: string
}
//-----------------------login_qr_key---------------------------------------------------
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
