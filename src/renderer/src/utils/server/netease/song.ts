import { request } from '../request'
import { Result } from 'ts-results'
import { SongCommentRequest, SongLikeChechRequest, SongLikeRequest } from './types/request/song'
import { SongCommentResponse, SongLikeCheckResponse } from './types/response/song'
//-----------------------song_comment---------------------------------------------------
/**
 * @description: 音乐评论
 */
export async function songComment(
  params: SongCommentRequest
): Promise<Result<SongCommentResponse, string>> {
  return await request<SongCommentResponse, SongCommentRequest>(
    '/api/netease/song/comments',
    params
  )
}

//-----------------------song_like_check---------------------------------------------------
/**
 * @description: 歌曲喜欢检查
 */
export async function songLikeCheck(
  params: SongLikeChechRequest
): Promise<Result<SongLikeCheckResponse, string>> {
  return await request<SongLikeCheckResponse, SongLikeChechRequest>(
    '/api/netease/song/like/check',
    params
  )
}
//-----------------------song_like--------------------------------------------------
/**
 * @description: 歌曲喜欢/取消喜欢
 */
export async function songLike(params: SongLikeRequest): Promise<Result<unknown, string>> {
  return await request<unknown, SongLikeRequest>('/api/netease/song/like', params)
}
