import { request } from '../../request'
import { Result } from 'ts-results'
import {
  LoginQrCreateRequest,
  LoginQrCheckRequest,
  LoginCellphoneRequest,
  SendCaptchaRequest,
  VerifyCaptchaRequest
} from './types'
import { LoginQrCreateResponse, LoginQrKeyResponse, LoginQrCheckResponse } from './types'
/**
 * * 登陆检查
 */
export async function loginQrCheck(
  params: LoginQrCheckRequest
): Promise<Result<LoginQrCheckResponse, string>> {
  return await request<LoginQrCheckRequest, LoginQrCheckResponse>('/netease/login/qr/check', params)
}
/**
 * * 登陆检查
 */
export async function loginQrCreate(
  params: LoginQrCreateRequest
): Promise<Result<LoginQrCreateResponse, string>> {
  return await request<LoginQrCreateRequest, LoginQrCreateResponse>(
    '/netease/login/qr/create',
    params
  )
}
/**
 * * 登陆检查
 */
export async function loginQrKey(): Promise<Result<LoginQrKeyResponse, string>> {
  return await request<object, LoginQrKeyResponse>('/netease/login/qrcode/key', {})
}
/**
 * * 登陆状态
 */
export async function loginCellphone(
  params: LoginCellphoneRequest
): Promise<Result<LoginCellphoneRequest, string>> {
  return await request<LoginCellphoneRequest, any>('/netease/login/cellphone', params)
}
/**
 * * 登陆状态
 */
export async function sendCaptcha(
  params: SendCaptchaRequest
): Promise<Result<SendCaptchaRequest, string>> {
  return await request<SendCaptchaRequest, any>('/netease/login/captcha/sent', params)
}

/**
 * * 登陆状态
 */
export async function verifyCaptcha(
  params: VerifyCaptchaRequest
): Promise<Result<VerifyCaptchaRequest, string>> {
  return await request<VerifyCaptchaRequest, any>('/netease/login/captcha/verify', params)
}

/**
 * * 登出
 */
export async function logout(): Promise<Result<any, string>> {
  return await request<any, any>('/netease/logout', {})
}
