import { createRequest, CryptoMode } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { PlaylistDetailRequestMessage } from '../message'
import { type PlaylistDetailRequest, type PlaylistDetailResponse } from '../types'

export class PlaylistDetailSystem {
  @HttpSystem({
    messageClass: PlaylistDetailRequestMessage
  })
  public static async getPlaylistDetail(
    @Body() body: PlaylistDetailRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { id } = body

    const answer = await createRequest(CryptoMode.eapi, {
      url: '/v6/playlist/detail',
      data: {
        id,
        n: 10,
        s: 8
      },
      cookies,
      headers
    })
    console.log('answer :>> ', answer)
    const raw: RawPlaylistDetail = answer.data?.playlist || {}

    // 数据清洗：转换成标准的 PlaylistDetail 结构
    const playlistDetail = {
      id: raw.id,
      name: raw.name,
      cover: raw.coverImgUrl,
      description: raw.description || '',
      songCount: raw.trackCount || 0,
      playCount: raw.playCount || 0,
      createTime: raw.createTime,
      creator: {
        id: raw.creator?.userId,
        name: raw.creator?.nickname || '',
        avatar: raw.creator?.avatarUrl || ''
      },
      songsIds: (raw.trackIds || []).map((t: any) => t.id),
      subscribedCount: raw.subscribedCount,
      shareCount: raw.shareCount
    }

    return Ok({
      code: 200,
      playlist: playlistDetail
    } as PlaylistDetailResponse)
  }
}

interface RawPlaylistDetail {
  id: number
  name: string
  coverImgUrl: string
  userId: number
  createTime: number
  updateTime: number
  trackCount: number
  trackUpdateTime: number
  playCount: number
  trackNumberUpdateTime: number
  subscribedCount: number
  description: string
  tags: string[]
  subscribers: {
    followed: boolean
    avatarUrl: string
    gender: number
    userId: number
    nickname: string
    signature: string
    description: string
    detailDescription: string
    backgroundUrl: string
    vipType: number
    avatarDetail: {
      identityIconUrl: string
      [key: string]: any
    }
    [key: string]: any
  }[]
  creator: {
    followed: boolean
    avatarUrl: string
    gender: number
    userId: number
    nickname: string
    signature: string
    description: string
    detailDescription: string
    backgroundUrl: string
    [key: string]: any
  }
  trackIds: {
    id: number
    uid: number
    [key: string]: any
  }[]
  [key: string]: any
}
