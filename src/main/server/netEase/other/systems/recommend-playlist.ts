import { createRequest, CryptoMode, type PlaylistInfo } from '../../utils'
import { Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { RecommendPlaylistRequestMessage } from '../message'
import { type RecommendPlaylistResponse } from '../types'

export class RecommendPlaylistSystem {
  @HttpSystem({
    messageClass: RecommendPlaylistRequestMessage
  })
  public static async getRecommendPlaylists(
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const answer = await createRequest(CryptoMode.weapi, {
      url: '/v1/discovery/recommend/resource',
      data: {},
      cookies,
      headers
    })

    // 将 RecommendPlaylistData 转换为标准的 PlaylistDetail
    const rawList = answer.data?.recommend || []

    const formattedPlaylists: PlaylistInfo[] = rawList.map((item: any) => ({
      id: item.id,
      name: item.name,
      cover: item.picUrl,
      description: item.copywriter || item.description,
      songCount: item.trackCount,
      playCount: item.playcount,
      createTime: item.createTime,
      updateTime: item.updateTime,
      creator: {
        id: item.creator.userId,
        name: item.creator.nickname,
        avatar: item.creator.avatarUrl
      }
    }))

    return Ok({
      code: 200,
      data: formattedPlaylists
    } as RecommendPlaylistResponse)
  }
}
