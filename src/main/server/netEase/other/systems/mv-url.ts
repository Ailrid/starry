import { createRequest, CryptoMode } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { MvUrlRequestMessage } from '../message'
import { type MvUrlRequest, type MvUrlResponse } from '../types'

export class MvUrlSystem {
  @HttpSystem({
    messageClass: MvUrlRequestMessage
  })
  public static async getMvUrl(
    @Body() body: MvUrlRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    // 解构参数：默认 1080P 分辨率
    const { id, r = 1080 } = body

    // 发起请求：去掉 /api 前缀
    const answer = await createRequest(CryptoMode.weapi, {
      url: '/song/enhance/play/mv/url',
      data: {
        id,
        r
      },
      cookies,
      headers
    })

    // 返回强类型响应 (通常包含 url 和分辨率等信息)
    return Ok(answer.data as MvUrlResponse)
  }
}
