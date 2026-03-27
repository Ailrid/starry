// import { createRequest, CryptoMode } from '../../utils'
// import { Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { HttpSystem, Ok } from '@virid/express'
import { LogoutRequestMessage } from '../message'

export class LogoutSystem {
  @HttpSystem({
    messageClass: LogoutRequestMessage
  })
  public static async logout() {
    // @Cookies() cookies: Record<string, string>,
    // @Headers() headers: Record<string, string>
    //   // 发起请求：去掉 /api，使用 weapi 模式
    //   const answer = await createRequest(CryptoMode.weapi, {
    //     url: '/logout',
    //     data: {},
    //     cookies,
    //     headers
    //   })

    //   // 返回响应：底层的 Relay 机制会自动处理网易云返回的“清除 Cookie”指令
    //   return Ok(answer.data)
    // }
    // 你之前确定的那四个黄金字段
    const requiredKeys = ['__csrf', 'MUSIC_A_T', 'MUSIC_R_T', 'MUSIC_U']

    // 构造清除指令
    // Max-Age=0 会告诉浏览器立即删除该 Cookie
    const clearCookieHeaders = requiredKeys.map(key => `${key}=; Path=/; Max-Age=0;`)

    // 返回时带上这些 Header
    return Ok(
      { success: true },
      {
        'Set-Cookie': clearCookieHeaders
      }
    )
  }
}
