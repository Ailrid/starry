import { request } from '../../request'
import { Result } from 'ts-results'
import { LoginQrCreateRequest, LoginQrCheckRequest, OpenLoginWindowResponse } from './types'
import {
  LoginQrCreateResponse,
  LoginQrKeyResponse,
  LoginQrCheckResponse,
  CloseLoginWindowResponse
} from './types'
/**
 * * 获取二维码状态
 */
export async function loginQrCheck(
  params: LoginQrCheckRequest
): Promise<Result<LoginQrCheckResponse, string>> {
  return await request<LoginQrCheckRequest, LoginQrCheckResponse>('/netease/login/qr/check', params)
}
/**
 * * 获取二维码
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
 * * 获取二维码key
 */
export async function loginQrKey(): Promise<Result<LoginQrKeyResponse, string>> {
  return await request<object, LoginQrKeyResponse>('/netease/login/qr/key', {})
}
/**
 * * 打开登陆窗口
 */
export async function openLoginWindow(): Promise<Result<OpenLoginWindowResponse, string>> {
  return await request<object, OpenLoginWindowResponse>('/netease/login/window/open', {})
}
/**
 * * 关闭登陆窗口
 */
export async function closeLoginWindow(): Promise<Result<CloseLoginWindowResponse, string>> {
  return await request<object, CloseLoginWindowResponse>('/netease/login/window/close', {})
}
/**
 * * 关闭登陆窗口
 */
export async function fetchCookies(): Promise<Result<CloseLoginWindowResponse, string>> {
  return await request<object, CloseLoginWindowResponse>('/netease/login/cookies', {})
}
/**
 * * 登出
 */
export async function logout(): Promise<Result<any, string>> {
  return await request<any, any>('/netease/logout', {})
}
