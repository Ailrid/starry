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
    const raw: RawPlaylistDetail = answer.data?.playlist || {}

    // 数据清洗：转换成标准的 PlaylistDetail 结构
    const playlistDetail = {
      id: raw.id,
      name: raw.name,
      cover: raw.coverImgUrl,
      description: raw.description || getRandomDescription(),
      songCount: raw.trackCount || 0,
      playCount: raw.playCount || 0,
      createTime: raw.createTime,
      creator: {
        id: raw.creator?.userId,
        name: raw.creator?.nickname || 'Unknown',
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

function getRandomDescription(): string {
  const magicLines = [
    '万籁俱寂，唯有旋律在流淌。',
    '在此频率中，捕捉到了一段纯粹的数字印记。',
    '乐至深处，无需多言。',
    '元数据已就绪，等待音频流注入核心。',
    '一段关于灵魂与声音的精选序列。',
    '在比特的间隙里，藏着旧时光的回响。',
    '让听觉在无限的二进制森林中自由漫步。',
    '这里的每一组波动，都是对时空的无声存档。',
    '有些旋律，注定只能在此时此刻相遇。',
    '沉浸于此，感受声波编织的数字梦境。'
  ]

  // 纯随机抽取
  const randomIndex = Math.floor(Math.random() * magicLines.length)
  return magicLines[randomIndex]
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
