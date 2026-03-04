//-----------------------album_sublist---------------------------------------------------
/**
 * @description: 用户收藏的专辑列表
 */
export interface AlbumSublistRequest {
  id: number
  limit?: number
  offset?: number
}

//-----------------------album---------------------------------------------------
/**
 * @description: 专辑详情
 */
export interface AlbumDetailRequest {
  id: number
}
//-----------------------album_sub---------------------------------------------------
/**
 * @description: 收藏/取消收藏专辑
 */
export interface AlbumSubRequest {
  id: number
  type: 'sub' | 'unsub'
}
//-----------------------album_album---------------------------------------------------
/**
 * @description: MV链接
 */
export interface AlbumWikiRequest {
  id: number
}
