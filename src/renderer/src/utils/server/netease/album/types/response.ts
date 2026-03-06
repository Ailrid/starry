//-----------------------album_sublist---------------------------------------------------

import { type SongDetail, type AlbumInfo, type AlbumDetail } from '../../../interfaces'

/** 用户收藏专辑列表响应 */
export interface AlbumSublistResponse {
  code: number
  data: AlbumInfo[]
  count: number
  hasMore: boolean
}

/** 专辑详情页响应 */
export interface AlbumDetailResponse {
  code: number
  album: AlbumDetail
  songs: SongDetail[]
}
