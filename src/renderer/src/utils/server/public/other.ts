import { request } from '../request'
import { Result } from 'ts-results'
import { LyricRequest } from './types/request/other'
import { LyircResponse } from './types/response/other'

//-----------------------lyric_new---------------------------------------------------
/**
 * @description: 歌词
 */
export async function lyric(params: LyricRequest): Promise<Result<LyircResponse, string>> {
  return await request<LyircResponse, LyricRequest>('/api/lyric', params)
}
