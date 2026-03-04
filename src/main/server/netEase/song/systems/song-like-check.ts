import { createRequest, CryptoMode } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { SongLikeCheckRequestMessage } from '../message'
import { type SongLikeCheckRequest } from '../types'

export class SongLikeCheckSystem {
  @HttpSystem({
    messageClass: SongLikeCheckRequestMessage
  })
  public static async checkLike(
    @Body() body: SongLikeCheckRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { ids } = body // 比如输入 [101, 102, 103]

    const answer = await createRequest(CryptoMode.eapi, {
      url: '/api/song/like/check',
      data: {
        trackIds: ids
      },
      cookies,
      headers
    })
    const rawData = answer.data as RawSongLikeCheckResponse
    const likedIdSet = new Set(rawData.ids || rawData.data || [])
    // 返回一个和输入 ids 等长的布尔数组
    const checkList: boolean[] = ids.map((id) => likedIdSet.has(id))

    return Ok({
      code: 200,
      likedList: checkList
    })
  }
}

/** 原始接口定义 */
interface RawSongLikeCheckResponse {
  ids?: number[]
  data?: number[]
  code: number
}
