//-----------------------playlist_create---------------------------------------------------
/**
 * * 创建歌单
 */
export interface PlaylistCreateRequest {
  name: string
  privacy: 10 | 0 //0 为普通歌单，10 为隐私歌单
  type: 'NORMAL' | 'VIDEO' | 'SHARED'
}
//-----------------------playlist_delete---------------------------------------------------

/**
 * * 歌单详细
 */
export interface PlaylistDeleteRequest {
  id: number
}
//-----------------------playlist_detail---------------------------------------------------

/**
 * * 歌单详细
 */
export interface PlaylistDetailRequest {
  id: number
}
//-----------------------playlist_order---------------------------------------------------

/**
 * * 歌单详细
 */
export interface PlaylistOrderUpdateRequest {
  pid: number
  ids: number
}
//-----------------------playlist_tracks---------------------------------------------------

/**
 * * 收藏单曲到歌单 从歌单删除歌曲
 */
export interface PlaylistSongUpdateRequest {
  op: 'add' | 'del' | 'update'
  pid: number
  ids: number[]
}
//-----------------------playlist_update---------------------------------------------------

/**
 * * 更新歌单描述、名字等
 */
export interface PlaylistUpdateRequest {
  id: number
  desc: string
  name: string
  tags?: string
}
