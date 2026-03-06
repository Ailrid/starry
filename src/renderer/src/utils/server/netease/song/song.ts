import { request } from '../../request'
import { Result } from 'ts-results'
import {
  SongCommentRequest,
  SongLikeCheckRequest,
  SongLikeRequest,
  SongDetailRequest
} from './types'
import { SongCommentResponse, SongLikeCheckResponse, SongDetailResponse } from './types'
//-----------------------song_comment---------------------------------------------------
/**
 * * 音乐评论
 */
export async function songComment(
  params: SongCommentRequest
): Promise<Result<SongCommentResponse, string>> {
  return await request<SongCommentRequest, SongCommentResponse>('/netease/songs/comments', params)
}

//-----------------------song_like_check---------------------------------------------------
/**
 * * 歌曲喜欢检查
 */
export async function songLikeCheck(
  params: SongLikeCheckRequest
): Promise<Result<SongLikeCheckResponse, string>> {
  return await request<SongLikeCheckRequest, SongLikeCheckResponse>(
    '/netease/songs/like-check',
    params
  )
}
//-----------------------song_like--------------------------------------------------
/**
 * * 歌曲喜欢/取消喜欢
 */
export async function songLike(params: SongLikeRequest): Promise<Result<unknown, string>> {
  return await request<SongLikeRequest, unknown>('/netease/songs/like', params)
}
//-----------------------song_detail---------------------------------------------------
/**
 * * 音乐详情
 */
export async function songDetail(
  params: SongDetailRequest
): Promise<Result<SongDetailResponse, string>> {
  return await request<SongDetailRequest, SongDetailResponse>('/netease/songs/detail', params)
}
