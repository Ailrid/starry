import { request } from '../../request'
import { Result } from 'ts-results'
import {
  PlaylistCreateRequest,
  PlaylistDeleteRequest,
  PlaylistDetailRequest,
  PlaylistOrderUpdateRequest,
  PlaylistSongUpdateRequest,
  PlaylistUpdateRequest
} from './types'
import { PlaylistCreateResponse, PlaylistDetailResponse } from './types'
/**
 * * 创建歌单
 */
export async function playlistCreate(
  params: PlaylistCreateRequest
): Promise<Result<PlaylistCreateResponse, string>> {
  return await request<PlaylistCreateRequest, PlaylistCreateResponse>(
    '/netease/playlists/create',
    params
  )
}

/**
 * * 歌单详细
 */
export async function playlistDelete(
  params: PlaylistDeleteRequest
): Promise<Result<unknown, string>> {
  return await request<PlaylistDeleteRequest, unknown>('/netease/playlists/delete', params)
}

/**
 * * 歌单详细
 */
export async function playlistDetail(
  params: PlaylistDetailRequest
): Promise<Result<PlaylistDetailResponse, string>> {
  return await request<PlaylistDetailRequest, PlaylistDetailResponse>(
    '/netease/playlists/detail',
    params
  )
}

/**
 * * 歌单详细
 */
export async function playlistOrderUpdate(
  params: PlaylistOrderUpdateRequest
): Promise<Result<unknown, string>> {
  return await request<PlaylistOrderUpdateRequest, unknown>(
    '/netease/playlists/order/update',
    params
  )
}

/**
 * * 收藏单曲到歌单 从歌单删除歌曲
 */
export async function playlistSongUpdate(
  params: PlaylistSongUpdateRequest
): Promise<Result<unknown, string>> {
  return await request<PlaylistSongUpdateRequest, unknown>(
    '/netease/playlists/songs/update',
    params
  )
}

/**
 * * 更新歌单描述、名字等
 */
export async function playlistUpdate(
  params: PlaylistUpdateRequest
): Promise<Result<unknown, string>> {
  return await request<PlaylistUpdateRequest, unknown>('/netease/playlists/update', params)
}
