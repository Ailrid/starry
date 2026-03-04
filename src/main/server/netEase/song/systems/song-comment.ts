import { createRequest, CryptoMode } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { SongCommentRequestMessage } from '../message'
import { type SongCommentRequest, type SongCommentResponse, type CommentItem } from '../types'

export class SongCommentsSystem {
  @HttpSystem({
    messageClass: SongCommentRequestMessage
  })
  public static async getComments(
    @Body() body: SongCommentRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { id, limit = 20, offset = 0, before = 0 } = body

    const answer = await createRequest(CryptoMode.weapi, {
      url: `/v1/resource/comments/R_SO_4_${id}`,
      data: {
        rid: id,
        limit,
        offset,
        beforeTime: before
      },
      cookies,
      headers
    })

    const raw = answer.data as RawSongCommentResponse

    // 内部转换器：就地处理单条评论的脱水
    const transform = (c: any): CommentItem => ({
      id: c.commentId,
      content: c.content,
      time: c.time,
      timeStr: c.timeStr,
      likedCount: c.likedCount || 0,
      isLiked: c.liked || false,
      user: {
        id: c.user.userId,
        name: c.user.nickname,
        avatar: c.user.avatarUrl,
        location: c.ipLocation?.location || '',
        isVip: c.user.vipType > 0
      },
      // 如果有回复，取出第一条回复（网易云目前 UI 逻辑通常只展示最新或第一条回复）
      replied: c.beReplied?.[0]
        ? {
            id: c.beReplied[0].beRepliedCommentId,
            content: c.beReplied[0].content,
            user: {
              id: c.beReplied[0].user.userId,
              name: c.beReplied[0].user.nickname,
              avatar: c.beReplied[0].user.avatarUrl,
              isVip: c.beReplied[0].user.vipType > 0
            }
          }
        : undefined
    })

    return Ok({
      code: 200,
      total: raw.total || 0,
      more: raw.more || false,
      hotComments: (raw.hotComments || []).map(transform),
      comments: (raw.comments || []).map(transform)
    } as SongCommentResponse)
  }
}

/**
 * @description: 音乐评论返回数据
 */
interface RawSongCommentResponse {
  comments: {
    user: {
      avatarUrl: string
      followed: boolean
      nickname: string
      vipType: number
      userId: number
      [key: string]: any
    }
    commentId: number
    content: string
    richContent: string
    time: number
    timeStr: string
    ipLocation: {
      ip: string
      location: string
      userId: number
    }
    [key: string]: any
  }[]
  hotComments: object[]
  userId: number
  code: number
  total: number
  more: boolean
  [key: string]: any
}
