//-----------------------artist_album---------------------------------------------------

import { type SongDetail, type ArtistInfo, type AlbumInfo } from '../../utils'

/**
 * @description: 歌手专辑列表
 */
export interface ArtistAlbumResponse {
  artist: ArtistInfo
  hotAlbums: AlbumInfo[]
  more: boolean
  code: number
}
//-----------------------artist_mv---------------------------------------------------
/**
 * @description: 歌手单个MV信息
 */
export interface ArtistMv {
  id: number
  name: string
  artist: {
    alias: string[]
    briefDesc: string
    picUrl: string
    img1v1Url: string
    albumSize: number
    trans: string
    musicSize: number
    name: string
    id: number
    [key: string]: any
  }
  imgurl16v9: string
  artistName: string
  imgurl: string
  duration: number
  playCount: number
  publishTime: string
  [key: string]: any
}

/**
 * @description: 歌手MV列表
 */
export interface ArtistMvResponse {
  mvs: ArtistMv[]
  time: number
  hasMore: boolean
  code: number
}
//-----------------------artist_song---------------------------------------------------

/**
 * @description: 歌手MV列表
 */
export interface ArtistSongResponse {
  songs: SongDetail[]
  total: number
  more: boolean
  code: number
}
//-----------------------artist_sublist---------------------------------------------------
/**
 * @description: 已收藏的歌手的简短信息
 */
export interface ArtistSub {
  info: string
  id: number
  name: string
  trans: string
  alias: string[]
  albumSize: number
  mvSize: number
  picUrl: string
  img1v1Url: string
  [key: string]: any
}

/**
 * @description: 已收藏的歌手列表
 */
export interface ArtistSublistResponse {
  data: ArtistSub[]
  count: number
  hasMore: boolean
  code: number
}
//-----------------------artist_sublist---------------------------------------------------
/**
 * @description: 歌手信息
 */
export interface ArtistDetailResponse {
  artist: ArtistInfo
  hotSongs: SongDetail[]
  more: boolean
  code: number
}
