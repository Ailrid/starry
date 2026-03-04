import { createRequest, CryptoMode } from '../../utils'
import { Body, HttpSystem, Ok, Cookies, Headers } from '@virid/express'
import { VerifyCaptchaRequestMessage } from '../message'
import { type VerifyCaptchaRequest } from '../types'

export class VerifyCaptchaSystem {
  @HttpSystem({
    messageClass: VerifyCaptchaRequestMessage
  })
  public static async verifyCaptcha(
    @Body() body: VerifyCaptchaRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { phone, captcha, ctcode = '86' } = body

    const data = {
      cellphone: phone,
      captcha: captcha,
      ctcode: ctcode
    }

    // 同样使用 weapi 模式，这是短信类业务的标配
    const answer = await createRequest(CryptoMode.weapi, {
      url: '/sms/captcha/verify', // 注意：这里原版带了 /api 前缀
      data,
      cookies,
      headers
    })

    // 网易云通常返回 { code: 200, data: true } 表示校验通过
    // 如果 code 为 400，通常是验证码错误或已过期
    return Ok(answer.data)
  }
}
