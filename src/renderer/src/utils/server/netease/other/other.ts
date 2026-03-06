import { request } from '../../request'
import { Result } from 'ts-results'
import {
  CommentRequest,
  MvDetailRequest,
  MvUrlRequest,
  IntelligenceRequest,
  VipInfoRequest,
  PersonalFmRequest
} from './types'
import {
  MvDetailResponse,
  MvUrlResponse,
  PersonalFmResponse,
  RecommendPlaylistResponse,
  RecommendSongResponse,
  VipInfoResponse,
  IntelligenceResponse
} from './types'
//-----------------------comment---------------------------------------------------
/**
 * * 评论
 */
export async function comment(params: CommentRequest): Promise<Result<unknown, string>> {
  return await request<CommentRequest, unknown>('/netease/comments', params)
}

//-----------------------mv_detail---------------------------------------------------
/**
 * * MV详情
 */
export async function mvDetail(params: MvDetailRequest): Promise<Result<MvDetailResponse, string>> {
  return await request<MvDetailRequest, MvDetailResponse>('/netease/mv/detail', params)
}
//-----------------------mv_url---------------------------------------------------
/**
 * * MV链接
 */
export async function mvUrl(params: MvUrlRequest): Promise<Result<MvUrlResponse, string>> {
  return await request<MvUrlRequest, MvUrlResponse>('/netease/mv/url', params)
}

/**
 * * personal_fm模式
 */
export async function personalFm(
  params: PersonalFmRequest
): Promise<Result<PersonalFmResponse, string>> {
  return await request<PersonalFmRequest, PersonalFmResponse>('/netease/playmode/fm/mode', params)
}

/**
 * * 推荐歌单
 */
export async function recommendPlaylist(): Promise<Result<RecommendPlaylistResponse, string>> {
  return await request<object, RecommendPlaylistResponse>('/netease/recommend/playlists', {})
}

/**
 * * 每日推荐
 */
export async function recommendSong(): Promise<Result<RecommendSongResponse, string>> {
  return await request<object, RecommendSongResponse>('/netease/recommend/song', {})
}

/**
 * * 心动模式
 */
export async function intelligence(
  params: IntelligenceRequest
): Promise<Result<IntelligenceResponse, string>> {
  return await request<IntelligenceRequest, IntelligenceResponse>(
    '/netease/playmode/intelligence/list',
    params
  )
}

/**
 * * vip信息
 */
export async function vipInfo(params: VipInfoRequest): Promise<Result<VipInfoResponse, string>> {
  return await request<VipInfoRequest, VipInfoResponse>('/netease/vip/info', params)
}
