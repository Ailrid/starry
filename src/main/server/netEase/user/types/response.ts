//-----------------------user_account/user_detail---------------------------------------------------

import { type PlaylistInfo, type SongDetail } from '../../utils'

/** 统一的用户画像 */
export interface UserProfile {
  userId: number
  nickname: string
  avatar: string
  background: string
  signature: string
  gender: number
  birthday: number
  vipType: number
  // 社交属性
  followed?: boolean
  followeds?: number // 粉丝数
  follows?: number // 关注数
  // 累计属性
  level?: number
  listenSongs?: number
  createTime: number
  createDays?: number
}

/** 1. 登录账户信息响应 */
export interface UserAccountResponse {
  code: number
  profile: UserProfile
  account: {
    id: number
    userName: string
    vipType: number
  }
}

/** 2. 用户详情响应 (主页用) */
export interface UserDetailResponse {
  code: number
  profile: UserProfile
}
//-----------------------user_playlist---------------------------------------------------
export interface UserPlaylistResponse {
  code: number
  playlists: PlaylistInfo[]
  more: boolean
}

//-----------------------user_record---------------------------------------------------
/**
 * @description: 用户最近播放歌曲
 */
export interface PlayRecord {
  playCount: number
  score: number
  song: SongDetail
}

/**
 * @description: 用户最近播放记录返回数据
 */
export interface UserRecordResponse {
  weekData?: PlayRecord[]
  allData?: PlayRecord[]
  code: number
}
//-----------------------user_subcount---------------------------------------------------
/**
 * @description: 用户最近播放记录返回数据
 */
export interface UserSubCountResponse {
  programCount: number
  djRadioCount: number
  mvCount: number
  artistCount: number
  newProgramCount: number
  createDjRadioCount: number
  createdPlaylistCount: number
  subPlaylistCount: number
  code: number
}
