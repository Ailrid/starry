import { type PlaylistDetail, type PlaylistInfo } from '../../../interfaces'

/**
 * * 创建歌单返回数据
 */
export interface PlaylistCreateResponse {
  code: number
  playlist: PlaylistInfo
  id: number
}

/**
 * * 歌单详细返回数据
 */
export interface PlaylistDetailResponse {
  code: number
  playlist: PlaylistDetail
  [key: string]: any
}
