import { createRequest, CryptoMode } from '../../utils'
import { Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { LoginStatusRequestMessage } from '../message'
// import { LoginStatusResponse } from "../types";

export class LoginStatusSystem {
  @HttpSystem({
    messageClass: LoginStatusRequestMessage
  })
  public static async getLoginStatus(
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    // 发起请求：去掉 /api，使用 weapi 模式
    // 该接口路径较为特殊：/w/nuser/account/get
    const answer = await createRequest(CryptoMode.weapi, {
      url: '/w/nuser/account/get',
      data: {},
      cookies,
      headers
    })

    // 返回标准化的登录状态响应
    return Ok(answer.data)
  }
}
