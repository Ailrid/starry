//-----------------------artist_album---------------------------------------------------

/**
 * * 歌手专辑列表
 */
export interface ArtistAlbumRequest {
  id: number
  limit: number
  offset: number
}
//-----------------------artist_mv---------------------------------------------------
/**
 * * 歌手MV列表
 */
export interface ArtistMvRequest {
  id: number
  limit: number
  offset: number
}
//-----------------------artist_song---------------------------------------------------
/**
 * * 歌手MV列表
 */
export interface ArtistSongRequest {
  id: number
  limit?: number
  order?: 'hot' | 'time'
  offset?: number
}
//-----------------------artist_sublist---------------------------------------------------

/**
 * * 已收藏的歌手列表
 */
export interface ArtistSublistRequest {
  limit: number
  offset: number
}
//-----------------------artist_detail---------------------------------------------------

/**
 * * 歌手信息
 */
export interface ArtistDetailRequest {
  id: number
}
//-----------------------artist_sub---------------------------------------------------

/**
 * * 收藏/取消收藏歌手
 */
export interface ArtistSubRequest {
  id: number
  type: 'sub' | 'unsub'
}
