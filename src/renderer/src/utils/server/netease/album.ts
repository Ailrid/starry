import { request } from '../request'
import { Result } from 'ts-results'
import { AlbumSublistRequest, AlbumDetailRequest, AlbumSubRequest } from './types'
import { AlbumSublistResponse, AlbumDetailResponse } from './types'

//-----------------------album_detail---------------------------------------------------
/**
 * @description: 专辑详情
 */
export async function albumDetail(
  params: AlbumDetailRequest
): Promise<Result<AlbumDetailResponse, string>> {
  return await request<AlbumDetailResponse, AlbumDetailRequest>('/api/netease/album/detail', params)
}

//-----------------------album_sub---------------------------------------------------
/**
 * @description: 收藏/取消收藏专辑
 */
export async function albumSub(params: AlbumSubRequest): Promise<Result<unknown, string>> {
  return await request<unknown, AlbumSubRequest>('/api/netease/album/sub', params)
}

//-----------------------album_sublist---------------------------------------------------
/**
 * @description: 用户收藏的专辑列表
 */
export async function albumSublist(
  params: AlbumSublistRequest
): Promise<Result<AlbumSublistResponse, string>> {
  return await request<AlbumSublistResponse, AlbumSublistRequest>(
    '/api/netease/album/sublist',
    params
  )
}
