import { createRequest, CryptoMode } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { LoginQrCheckRequestMessage } from '../message'
import { type LoginQrCheckRequest, type LoginQrCheckResponse } from '../types'

export class LoginQrCheckSystem {
  @HttpSystem({
    messageClass: LoginQrCheckRequestMessage
  })
  public static async checkQrStatus(
    @Body() body: LoginQrCheckRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { unikey } = body

    const answer = await createRequest(CryptoMode.eapi, {
      url: '/login/qrcode/client/login',
      data: {
        key: unikey,
        type: 3
      },
      cookies,
      headers
    })
    return Ok(answer.data as LoginQrCheckResponse, {
      'Set-Cookie': answer.cookies
    })
  }
}
