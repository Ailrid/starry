/**
 * * 用户账户详细信息返回数据
 */
export interface UserDetailRequest {
  uid: number
}

/**
 * * 用户账户详细信息返回数据
 */
export interface UserPlaylistRequest {
  uid: number
  limit: number
  offset: number
}

/**
 * * 用户最近播放记录返回数据
 * 1: 最近一周, 0: 所有时间
 */
export interface UserRecordRequest {
  uid: number
  type: 0 | 1
}
