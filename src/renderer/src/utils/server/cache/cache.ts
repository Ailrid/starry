import { request } from '../request'
import { Result } from 'ts-results'
import { LyricRequest, SongUrlRequest } from './types'
import { LyricResponse, SongUrlResponse } from './types'

/**
 * * 获取歌词
 */
export async function lyric(params: LyricRequest): Promise<Result<LyricResponse, string>> {
  return await request<LyricRequest, LyricResponse>('/cache/lyric', params)
}

/**
 * * 获取歌曲链接
 */
export async function songUrl(params: SongUrlRequest): Promise<Result<SongUrlResponse, string>> {
  return await request<SongUrlRequest, SongUrlResponse>('/cache/songs/url', params)
}
