/**
 * * 扫码状态查询
 */
export interface LoginQrCheckRequest {
  unikey: string
}

/**
 * * 创建登陆二维码
 */
export interface LoginQrCreateRequest {
  unikey: string
}
/**
 * * 手机登陆
 */
export interface LoginCellphoneRequest {
  phone: number
  password: string
  md5_password?: string
  captcha: number
  countrycode: string
}
/**
 * * 发送二维码
 */
export interface SendCaptchaRequest {
  phone: number
  ctcode?: number
}
/**
 * * 验证二维码
 */
export interface VerifyCaptchaRequest {
  phone: number
  captcha: number
  ctcode: string
}
