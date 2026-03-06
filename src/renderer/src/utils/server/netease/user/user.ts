import { request } from '../../request'
import { Result } from 'ts-results'
import { UserDetailRequest, UserPlaylistRequest, UserRecordRequest } from './types'
import {
  UserAccountResponse,
  UserDetailResponse,
  UserPlaylistResponse,
  UserRecordResponse,
  UserSubCountResponse
} from './types'

/**
 * * 自己的账户详细
 */
export async function userAccount(): Promise<Result<UserAccountResponse, string>> {
  return await request<object, UserAccountResponse>('/netease/users/account', {})
}

/**
 * * 用户账户详细信息
 */
export async function userDetail(
  params: UserDetailRequest
): Promise<Result<UserDetailResponse, string>> {
  return await request<UserDetailRequest, UserDetailResponse>('/netease/users/detail', params)
}

/**
 * * 用户歌单信息
 */
export async function userPlaylist(
  params: UserPlaylistRequest
): Promise<Result<UserPlaylistResponse, string>> {
  return await request<UserPlaylistRequest, UserPlaylistResponse>(
    '/netease/users/playlists',
    params
  )
}

/**
 * * 用户最近播放记录返回数据
 * 1: 最近一周, 0: 所有时间
 */
export async function userRecord(
  params: UserRecordRequest
): Promise<Result<UserRecordResponse, string>> {
  return await request<UserRecordRequest, UserRecordResponse>('/netease/users/records', params)
}

/**
 * * 用户粉丝
 */
export async function userSubcount(): Promise<Result<UserSubCountResponse, string>> {
  return await request<object, UserSubCountResponse>('/netease/users/record', {})
}
