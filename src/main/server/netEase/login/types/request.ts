//-----------------------login_qr_check---------------------------------------------------
/**
 * * 扫码状态查询
 */
export interface LoginQrCheckRequest {
  unikey: string
}
//-----------------------login_qr_create---------------------------------------------------
/**
 * * 创建登陆二维码
 */
export interface LoginQrCreateRequest {
  unikey: string
}

export interface LoginCellphoneRequest {
  phone: number
  password: string
  md5_password?: string
  captcha: number
  countrycode: string
}

export interface SendCaptchaRequest {
  phone: number
  ctcode?: number
}

export interface VerifyCaptchaRequest {
  phone: number
  captcha: number
  ctcode: string
}
