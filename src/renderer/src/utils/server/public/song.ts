import { request } from '../request'
import { Result } from 'ts-results'
import { SongUrlRequest, LyricRequest } from './types'
import { SongUrlResponse, LyricResponse } from './types'

//-----------------------song_url---------------------------------------------------
/**
 * @description: 歌曲url
 * standard, exhigh, lossless, hires, jyeffect(高清环绕声), sky(沉浸环绕声), jymaster(超清母带)
 */
export async function songUrl(params: SongUrlRequest): Promise<Result<SongUrlResponse, string>> {
  return await request<SongUrlResponse, SongUrlRequest>('/api/song/url', params)
}
//-----------------------lyric_new---------------------------------------------------
/**
 * @description: 歌词
 */
export async function lyric(params: LyricRequest): Promise<Result<LyricResponse, string>> {
  return await request<LyricResponse, LyricRequest>('/api/lyric', params)
}
