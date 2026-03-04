//-----------------------album_sublist---------------------------------------------------

import { type SongDetail, type AlbumInfo, type AlbumDetail } from '../../utils'

/** 用户收藏专辑列表响应 */
export interface AlbumSublistResponse {
  code: number
  data: AlbumInfo[] // 已经过脱水处理
  count: number
  hasMore: boolean
}

/** 专辑详情页响应 */
export interface AlbumDetailResponse {
  code: number
  album: AlbumDetail
  songs: SongDetail[]
}
