/**
 * * 音乐评论
 */
export interface SongCommentRequest {
  id: number
  limit: number
  offset: number
  before: number
}

/**
 * * 歌曲喜欢检查
 */
export interface SongLikeCheckRequest {
  ids: number[]
}

/**
 * * 歌曲喜欢/取消喜欢
 */
export interface SongLikeRequest {
  id: number
  like: boolean
}

/**
 * * 音乐详情
 */
export interface SongDetailRequest {
  ids: number[]
}
