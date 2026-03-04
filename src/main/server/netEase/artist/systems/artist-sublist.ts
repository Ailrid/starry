import { createRequest, CryptoMode } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { ArtistSublistRequestMessage } from '../message'
import { type ArtistSublistRequest, type ArtistSublistResponse } from '../types'

export class ArtistSublistSystem {
  @HttpSystem({
    messageClass: ArtistSublistRequestMessage
  })
  public static async getArtistSublist(
    @Body() body: ArtistSublistRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    // 1. 提取参数并设置默认值
    const { limit = 100, offset = 0 } = body

    // 2. 发起请求：去掉 /api，使用 weapi 模式
    const answer = await createRequest(CryptoMode.weapi, {
      url: '/artist/sublist',
      data: {
        limit,
        offset,
        total: true
      },
      cookies,
      headers
    })

    // 3. 返回强类型响应
    return Ok(answer.data as ArtistSublistResponse)
  }
}
