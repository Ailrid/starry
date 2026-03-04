import { createRequest, CryptoMode, type PlaylistInfo } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { UserPlaylistRequestMessage } from '../message'
import { type UserPlaylistResponse } from '../types'

export class UserPlaylistSystem {
  @HttpSystem({
    messageClass: UserPlaylistRequestMessage
  })
  public static async getUserPlaylists(
    @Body() body: { uid: number; limit?: number; offset?: number },
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { uid, limit = 30, offset = 0 } = body

    const answer = await createRequest(CryptoMode.weapi, {
      url: '/user/playlist', // 移除 /api 前缀
      data: {
        uid,
        limit,
        offset,
        includeVideo: true
      },
      cookies,
      headers
    })

    const raw = answer.data as RawUserPlaylistResponse

    // 统一转换为 PlaylistInfo
    const playlists: PlaylistInfo[] = (raw.playlist || []).map((pl) => ({
      id: pl.id,
      name: pl.name,
      cover: pl.coverImgUrl,
      creator: {
        id: pl.creator.userId,
        name: pl.creator.nickname,
        avatar: pl.creator.avatarUrl
      },
      description: pl.description || '',
      songCount: pl.trackCount,
      playCount: pl.playCount,
      createTime: pl.createTime,
      userId: pl.userId // 用于前端逻辑：if(pl.userId === myId) -> "我创建的"
    }))

    return Ok({
      code: 200,
      more: raw.more,
      playlists: playlists
    } as UserPlaylistResponse)
  }
}

/**
 * @description: 用户账户详细信息返回数据
 */
interface RawUserPlaylistResponse {
  more: boolean
  playlist: {
    subscribers: string[]
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
      vipType: string
      [key: string]: any
    }
    subscribedCount: number
    userId: number
    trackUpdateTime: number
    trackCount: number
    updateTime: number
    coverImgUrl: string
    createTime: number
    playCount: number
    description: string
    tags: string[]
    name: string
    id: number
    [key: string]: any
  }[]
  code: number
}
