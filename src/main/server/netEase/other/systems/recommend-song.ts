import {
  createRequest,
  CryptoMode,
  type RawSongDetailResponse,
  convertSongDetail
} from '../../utils'
import { Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { RecommendSongRequestMessage } from '../message'
import { type RecommendSongResponse } from '../types'

export class RecommendSongsSystem {
  @HttpSystem({
    messageClass: RecommendSongRequestMessage
  })
  public static async getRecommendSongs(
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const recommendAnswer = await createRequest(CryptoMode.weapi, {
      url: '/v3/discovery/recommend/songs',
      data: {},
      cookies,
      headers
    })

    const dailySongs = recommendAnswer.data?.data?.dailySongs || []

    const tracksID = dailySongs.map((item: any) => ({
      id: item.id
    }))

    const tracksAnswer = await createRequest(CryptoMode.weapi, {
      url: '/v3/song/detail',
      data: { c: JSON.stringify(tracksID) },
      cookies,
      headers
    })

    // 转换
    const formattedSongs = convertSongDetail(tracksAnswer.data as RawSongDetailResponse)
    return Ok({
      code: 200,
      data: formattedSongs
    } as RecommendSongResponse)
  }
}
