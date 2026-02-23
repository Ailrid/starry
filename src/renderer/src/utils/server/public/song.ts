import { request } from '../request'
import { Result } from 'ts-results'
import { SongDetailRequest, SongUrlRequest } from './types/request/song'
import { SongDetailResponse, SongUrlResponse } from './types/response/song'

//-----------------------song_detail---------------------------------------------------
/**
 * @description: 音乐详情
 */
export async function songDetail(
  params: SongDetailRequest
): Promise<Result<SongDetailResponse, string>> {
  return await request<SongDetailResponse, SongDetailRequest>('/api/song/detail', params)
}

//-----------------------song_url---------------------------------------------------
/**
 * @description: 歌曲url
 * standard, exhigh, lossless, hires, jyeffect(高清环绕声), sky(沉浸环绕声), jymaster(超清母带)
 */
export async function songUrl(params: SongUrlRequest): Promise<Result<SongUrlResponse, string>> {
  return await request<SongUrlResponse, SongUrlRequest>('/api/song/url', params)
}
