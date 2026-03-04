import {
  createRequest,
  CryptoMode,
  type RawSongDetailResponse,
  convertSongDetail,
  type SongDetail
} from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { ArtistSongsRequestMessage } from '../message'
import { type ArtistSongRequest, type ArtistSongResponse } from '../types'

export class ArtistSongsSystem {
  @HttpSystem({
    messageClass: ArtistSongsRequestMessage
  })
  public static async getArtistSongs(
    @Body() body: ArtistSongRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { id, order = 'hot', limit = 100, offset = 0 } = body

    // 1. 获取歌手歌曲索引 (使用 EAPI 拿 ID 列表)
    const listAnswer = await createRequest(CryptoMode.eapi, {
      url: '/v1/artist/songs',
      data: {
        id,
        private_cloud: 'true',
        work_type: 1,
        order,
        offset,
        limit
      },
      cookies,
      headers
    })

    const rawSongs = listAnswer.data?.songs || []
    if (rawSongs.length === 0) {
      return Ok({
        code: 200,
        songs: [],
        total: 0,
        more: false
      } as ArtistSongResponse)
    }

    // 2. 提取 ID 准备补全
    const tracksID = rawSongs.map((item: any) => ({ id: item.id }))

    // 3. 批量查询标准详情 (补全版权、高清封面等)
    const tracksAnswer = await createRequest(CryptoMode.weapi, {
      url: '/v3/song/detail',
      data: { c: JSON.stringify(tracksID) },
      cookies,
      headers
    })

    // 4. 使用你的黄金转换器清洗数据
    const formattedSongs: SongDetail[] = convertSongDetail(
      tracksAnswer.data as RawSongDetailResponse
    )

    // 5. 组装最简响应体，彻底抛弃 listAnswer.data 里的原始脏数据
    return Ok({
      code: 200,
      songs: formattedSongs,
      total: listAnswer.data.total || 0,
      more: listAnswer.data.more || false
    } as ArtistSongResponse)
  }
}
