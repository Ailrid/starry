//-----------------------playlist_create---------------------------------------------------

import { type PlaylistDetail, type PlaylistInfo } from '../../utils'

/**
 * * 创建歌单返回数据
 */
export interface PlaylistCreateResponse {
  code: number
  playlist: PlaylistInfo
  id: number
}
//-----------------------playlist_detail---------------------------------------------------

/**
 * * 歌单详细返回数据
 */
export interface PlaylistDetailResponse {
  code: number
  playlist: PlaylistDetail
  [key: string]: any
}
