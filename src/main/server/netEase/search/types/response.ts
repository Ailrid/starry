//-----------------------search_suggest---------------------------------------------------

import { type AlbumInfo, type ArtistInfo, type SongDetail, type PlaylistInfo } from '../../utils'
/**
 * @description:搜索建议
 */
export interface SearchSuggestResponse {
  result: {
    albums: AlbumInfo[]
    artists: ArtistInfo[]
    songs: SongDetail[]
    playlists: PlaylistInfo[]
    order: string[]
  }
  code: number
}
//-----------------------search---------------------------------------------------
export interface SearchSongItem extends SongDetail {
  // 搜索歌词时特有，展示匹配片段
  lyricSnippet?: string
}

export interface UserInfo {
  id: number
  name: string
  avatar: string
  signature: string
  gender: number // 0: 保密, 1: 男, 2: 女
  isVip: boolean
}
export interface MvInfo {
  id: number
  name: string
  cover: string
  artistName: string
  artistId: number
  duration: number
  playCount: number
}
/**
 * 统一的搜索响应结构
 */
export interface SearchResponse<T> {
  code: number
  items: T[] // 这里的 T 对应不同的清理后模型
  total: number // 自动对齐各种 xxxCount
  hasMore: boolean
}
