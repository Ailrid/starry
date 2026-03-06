//-----------------------song_comment---------------------------------------------------
/**
 * * 音乐评论
 */
export interface SongCommentRequest {
  id: number
  limit: number
  offset: number
  before: number
}
//-----------------------song_lick_check---------------------------------------------------
/**
 * * 歌曲喜欢检查
 */
export interface SongLikeCheckRequest {
  ids: number[]
}
//-----------------------song_lick--------------------------------------------------
/**
 * * 歌曲喜欢/取消喜欢
 */
export interface SongLikeRequest {
  id: number
  like: boolean
}
//-----------------------song_detail---------------------------------------------------
/**
 * * 音乐详情
 */
export interface SongDetailRequest {
  ids: number[]
}
