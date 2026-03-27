import {
  createRequest,
  CryptoMode,
  type RawSongDetailResponse,
  convertSongDetail
} from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { IntelligenceModeRequestMessage } from '../message'
import { type IntelligenceRequest, type IntelligenceResponse } from '../types'

export class IntelligenceListSystem {
  @HttpSystem({
    messageClass: IntelligenceModeRequestMessage
  })
  public static async getIntelligenceList(
    @Body() body: IntelligenceRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { id, pid, sid, count = 1 } = body

    // 获取心动模式的原始索引列表
    const listAnswer = await createRequest(CryptoMode.weapi, {
      url: '/playmode/intelligence/list',
      data: {
        songId: id,
        playlistId: pid,
        startMusicId: sid || id,
        count: count,
        type: 'fromPlayOne'
      },
      cookies,
      headers
    })
    // 提取歌曲 ID 列表
    const tracksID = listAnswer.data.data.map((item: any) => ({
      id: item.id || item.songInfo.id
    }))

    // 请求标准的歌曲详情
    const tracksAnswer = await createRequest(CryptoMode.weapi, {
      url: '/v3/song/detail',
      data: { c: JSON.stringify(tracksID) },
      cookies,
      headers
    })
    // 清洗
    const rawSongData: RawSongDetailResponse = tracksAnswer.data
    const formattedSongs = convertSongDetail(rawSongData)
    const res = await createRequest(CryptoMode.eapi, {
      url: '/song/like/check',
      data: {
        trackIds: formattedSongs.map(i => i.id)
      },
      cookies,
      headers
    })
    const likedIdSet = new Set(res.data.ids || res.data.data || [])
    // 返回一个和输入 ids 等长的布尔数组
    formattedSongs.forEach(song => {
      song.like = likedIdSet.has(song.id)
    })

    return Ok({
      code: 200,
      songs: formattedSongs,
      message: listAnswer.data.message
    } as IntelligenceResponse)
  }
}
