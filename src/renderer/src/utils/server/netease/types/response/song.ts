//-----------------------song_comment---------------------------------------------------
/**
 * @description: 音乐评论返回数据
 */
export interface SongCommentResponse {
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

//-----------------------song_lick_check---------------------------------------------------
/**
 * @description: 歌曲喜欢检查返回数据
 */
export interface SongLikeCheckResponse {
  ids: number[]
  code: 200
}
