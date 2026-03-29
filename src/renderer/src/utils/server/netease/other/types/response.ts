import { type PlaylistInfo, type SongDetail } from '../../../interfaces'
import { type PersonalFmRequest } from './request'

/**
 * * MV详情
 */
export interface MvDetailResponse {
  mp: {
    id: number
    pl: number
    dl: number
    [key: string]: any
  }
  data: {
    id: number
    name: string
    artistId: number
    artistName: string
    briefDesc: string
    desc: string
    cover: string
    playCount: number
    commentCount: number
    duration: number
    publishTime: string
    brs: {
      size: number
      br: number
      point: number
    }[]
    artists: [
      {
        id: number
        name: string
        img1v1Url: string
        followed: boolean
      }
    ]
    videoGroup: {
      id: number
      name: string
      type: number
    }[]
    [key: string]: any
  }
  code: number
  [key: string]: any
}

/**
 * * MV链接
 */
export interface MvUrlResponse {
  data: {
    id: number
    url: string
    [key: string]: any
  }
  code: number
}

/**
 * * 私人FM
 */
export interface PersonalFmResponse {
  songs: SongDetail[]
  code: number
  mode: PersonalFmRequest['mode']
}

/**
 * * 私人FM
 */
export interface RecommendPlaylistResponse {
  data: PlaylistInfo[]
  code: number
  [key: string]: any
}

/**
 * * 日推
 */
export interface RecommendSongResponse {
  data: SongDetail[]
  code: number
}

/**
 * @description 统一的 VIP 账户状态
 */
export interface UserVipStatus {
  userId: number
  /** 是否具有任何形式的有效 VIP 特权 */
  isVip: boolean
  /** 红包/红心 VIP 等级 (1-10) */
  redVipLevel: number
  /** 详细的订阅明细 */
  details: {
    /** 黑胶 VIP (网易云最核心的会员) */
    blackVip: VipSubscription
    /** 音乐包 (相对低等级的会员) */
    musicPackage: VipSubscription
  }
}

/**
 * @description 单项订阅明细
 */
interface VipSubscription {
  /** 内部状态码，0 通常表示无权限 */
  code: number
  /** 过期时间戳 (ms) */
  expire: number
}

/**
 * @description VIP 信息接口响应
 */
export interface VipInfoResponse {
  code: number
  data: UserVipStatus
}

/**
 * * 心动模式数据
 */
export interface IntelligenceResponse {
  message: string
  songs: SongDetail[]
  code: number
}

export interface HomepagePlaylist {
  title: string
  playlist: {
    id: number
    title: string
    subTitle: string
    cover: string
    labels: string[]
  }[]
}

export interface HomepageSong {
  title: string
  subTitle: string
  detail: SongDetail[]
}

export interface HomepageResponse {
  code: number
  data: {
    playlist: HomepagePlaylist
    songs: HomepageSong[]
    radar: HomepagePlaylist
  }
}
