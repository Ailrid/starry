//-----------------------song_comment---------------------------------------------------
/**
 * * 音乐评论返回数据
 */

import { type SongDetail } from '../../utils'

/** 评论用户信息 */
export interface CommentUser {
  id: number
  name: string
  avatar: string
  location?: string // IP 属地
  isVip: boolean
}

/** 评论项 */
export interface CommentItem {
  id: number
  content: string
  time: number
  timeStr: string
  likedCount: number
  isLiked: boolean
  user: CommentUser
  // 被回复的评论（如果有的话）
  replied?: {
    id: number
    content: string
    user: CommentUser
  }
}

/** 歌曲评论响应 */
export interface SongCommentResponse {
  code: number
  total: number
  more: boolean
  hotComments: CommentItem[]
  comments: CommentItem[]
}

//-----------------------song_lick_check---------------------------------------------------
/**
 * * 歌曲喜欢检查返回数据
 */

export interface SongLikeCheckResponse {
  code: number
  likedMap: Record<number, boolean> // { "101": true, "102": false, "103": true }
  likedList: boolean[] // [true, false, true]
}
//-----------------------song_detail---------------------------------------------------
/**
 * * 音乐详情返回数据
 */
export interface SongDetailResponse {
  songs: SongDetail[]
  code: number
}
