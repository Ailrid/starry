import { createRequest, CryptoMode } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { SongLikeRequestMessage } from '../message'
import { type SongLikeRequest } from '../types'

export class SongLikeSystem {
  @HttpSystem({
    messageClass: SongLikeRequestMessage
  })
  public static async toggleLike(
    @Body() body: SongLikeRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { id, like } = body

    const answer = await createRequest(CryptoMode.weapi, {
      url: '/radio/like',
      data: {
        trackId: id,
        like: like,
        alg: 'itembased', // 这里的算法参数建议保留，网易云内部统计用
        time: '3' // 固定参数，通常代表操作来源
      },
      cookies,
      headers
    })

    const rawData = answer.data as any

    // 只要接口返回 code 200，就代表操作成功
    return Ok({
      code: rawData.code || 200,
      message: rawData.message || 'Success'
    })
  }
}
