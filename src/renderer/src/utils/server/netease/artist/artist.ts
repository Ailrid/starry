import { request } from '../../request'
import { Result } from 'ts-results'
import {
  ArtistAlbumRequest,
  ArtistMvRequest,
  ArtistSongRequest,
  ArtistSubRequest,
  ArtistSublistRequest,
  ArtistDetailRequest
} from './types'
import {
  ArtistAlbumResponse,
  ArtistMvResponse,
  ArtistSongResponse,
  ArtistSublistResponse,
  ArtistDetailResponse
} from './types'

/**
 * * 歌手专辑列表
 */
export async function artistAlbum(
  params: ArtistAlbumRequest
): Promise<Result<ArtistAlbumResponse, string>> {
  return await request<ArtistAlbumRequest, ArtistAlbumResponse>('/netease/artists/albums', params)
}
/**
 * * 歌手MV列表
 */
export async function artistMv(params: ArtistMvRequest): Promise<Result<ArtistMvResponse, string>> {
  return await request<ArtistMvRequest, ArtistMvResponse>('/netease/artists/mvs', params)
}
/**
 * * 歌手MV列表
 */
export async function artistSong(
  params: ArtistSongRequest
): Promise<Result<ArtistSongResponse, string>> {
  return await request<ArtistSongRequest, ArtistSongResponse>('/netease/artists/songs', params)
}

/**
 * * 收藏/取消收藏歌手
 */
export async function artistSub(params: ArtistSubRequest): Promise<Result<unknown, string>> {
  return await request<ArtistSubRequest, unknown>('/netease/artists/sub', params)
}

/**
 * * 已收藏的歌手列表
 */
export async function artistSublist(
  params: ArtistSublistRequest
): Promise<Result<ArtistSublistResponse, string>> {
  return await request<ArtistSublistRequest, ArtistSublistResponse>(
    '/netease/artists/sublist',
    params
  )
}

/**
 * * 歌手信息
 */
export async function artistDetail(
  params: ArtistDetailRequest
): Promise<Result<ArtistDetailResponse, string>> {
  return await request<ArtistDetailRequest, ArtistDetailResponse>('/netease/artists/detail', params)
}
