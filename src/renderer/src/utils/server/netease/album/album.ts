import { request } from '../../request'
import { Result } from 'ts-results'
import { AlbumSublistRequest, AlbumDetailRequest, AlbumSubRequest, AlbumWikiRequest } from './types'
import { AlbumSublistResponse, AlbumDetailResponse } from './types'

/**
 * * 专辑详情
 */
export async function albumDetail(
  params: AlbumDetailRequest
): Promise<Result<AlbumDetailResponse, string>> {
  return await request<AlbumDetailRequest, AlbumDetailResponse>('/netease/albums/detail', params)
}

/**
 * * 专辑收藏
 */
export async function albumSub(params: AlbumSubRequest): Promise<Result<unknown, string>> {
  return await request<AlbumSubRequest, unknown>('/netease/albums/sub', params)
}

/**
 * * 专辑收藏列表
 */
export async function albumSublist(
  params: AlbumSublistRequest
): Promise<Result<AlbumSublistResponse, string>> {
  return await request<AlbumSublistRequest, AlbumSublistResponse>('/netease/albums/sublist', params)
}
/**
 * * 专辑 wiki
 */
export async function albumWiki(
  params: AlbumSublistRequest
): Promise<Result<AlbumWikiRequest, string>> {
  return await request<AlbumWikiRequest, any>('/netease/albums/sublist', params)
}
