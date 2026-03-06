/**
 * * 歌手专辑列表
 */
export interface ArtistAlbumRequest {
  id: number
  limit: number
  offset: number
}

/**
 * * 歌手MV列表
 */
export interface ArtistMvRequest {
  id: number
  limit: number
  offset: number
}

/**
 * * 歌手MV列表
 */
export interface ArtistSongRequest {
  id: number
  limit?: number
  order?: 'hot' | 'time'
  offset?: number
}

/**
 * *已收藏的歌手列表
 */
export interface ArtistSublistRequest {
  limit: number
  offset: number
}

/**
 * * 歌手信息
 */
export interface ArtistDetailRequest {
  id: number
}

/**
 * * 收藏/取消收藏歌手
 */
export interface ArtistSubRequest {
  id: number
  type: 'sub' | 'unsub'
}
