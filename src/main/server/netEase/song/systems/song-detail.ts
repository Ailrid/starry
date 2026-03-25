import { createRequest, CryptoMode, convertSongDetail } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { SongDetailRequestMessage } from '../message'
import { type SongDetailRequest, type SongDetailResponse } from '../types'

export class SongDetailSystem {
  @HttpSystem({
    messageClass: SongDetailRequestMessage
  })
  public static async getDetail(
    @Body() body: SongDetailRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { ids } = body

    // 格式化 ID 为网易云要求的 [{id: 123}, {id: 456}] 格式
    const trackIds = ids.map(id => ({ id }))

    const answer = await createRequest(CryptoMode.weapi, {
      url: '/v3/song/detail',
      data: {
        c: JSON.stringify(trackIds)
      },
      cookies,
      headers
    })

    const rawData = answer.data as RawSongDetailResponse
    const formattedSongs = convertSongDetail(rawData)
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
      songs: formattedSongs
    } as SongDetailResponse)
  }
}

/**
 * * 音乐详情返回的原始的数据
 */
interface RawSongDetailResponse {
  songs: {
    name: string
    id: number
    ar: {
      id: number
      name: string
      tns: string[]
      alias: string[]
      [key: string]: any
    }[]
    alia: string[]
    al: {
      id: number
      name: string
      picUrl: string
      tns: string[]
      [key: string]: any
    }
    dt: number
    mv: number
    publishTime: number
    tns: string[]
    [key: string]: any
  }[]
  privileges: {
    id: number
    fee: 0 | 1 | 4 | 8 | number
    freeTrialPrivilege: {
      resConsumable: boolean
      userConsumable: boolean
      [key: string]: any
    }
    [key: string]: any
  }[]
  code: number
}
