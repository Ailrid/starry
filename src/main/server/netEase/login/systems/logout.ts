import { createRequest, CryptoMode } from '../../utils'
import { Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { LogoutRequestMessage } from '../message'

export class LogoutSystem {
  @HttpSystem({
    messageClass: LogoutRequestMessage
  })
  public static async logout(
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    // 发起请求：去掉 /api，使用 weapi 模式
    const answer = await createRequest(CryptoMode.weapi, {
      url: '/logout',
      data: {},
      cookies,
      headers
    })

    // 返回响应：底层的 Relay 机制会自动处理网易云返回的“清除 Cookie”指令
    return Ok(answer.data)
  }
}
