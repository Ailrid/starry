import { createRequest, CryptoMode } from '../../utils'
import { Body, HttpSystem, Ok, Cookies, Headers } from '@virid/express'
import { SendCaptchaRequestMessage } from '../message'
import { type SendCaptchaRequest } from '../types'
export class SendCaptchaSystem {
  @HttpSystem({
    messageClass: SendCaptchaRequestMessage
  })
  public static async sendCaptcha(
    @Body() body: SendCaptchaRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { phone, ctcode = '86' } = body

    const data = {
      cellphone: phone,
      ctcode: ctcode
    }

    const answer = await createRequest(CryptoMode.weapi, {
      url: '/sms/captcha/sent',
      data,
      cookies,
      headers
    })
    return Ok(answer.data)
  }
}
