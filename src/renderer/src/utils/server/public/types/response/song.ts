//-----------------------song_detail---------------------------------------------------
/**
 * @description: 音乐详情返回数据
 */
export interface SongDetailResponse {
  songs: {
    // 核心标识
    id: number // 框架全局 ID
    platformId: string // 原始 ID
    source: 'netease' | 'local'
    // 基础元数据
    name: string // 歌名
    artists: { id: number | string; name: string }[] // 统一叫 artists
    album: {
      id: number | string
      name: string
      cover: string // 统一叫 cover
    }
    // 播放属性
    duration: number // 统一毫秒或秒
    url?: string // 预留给播放地址
    level?: string // 音质标识
    // 状态位
    isAvailable: boolean // 是否有版权/文件是否存在
    localPath?: string // 本地歌曲专用
    raw?: any // 仍然保留一份原始数据
  }[]
  code: number
}
//-----------------------song_url---------------------------------------------------
/**
 * @description: 歌曲url返回数据
 */
export interface SongUrlResponse {
  data: {
    id: number
    url: string
    md5: string
    size: number
    br: number
    level: string
  }
  code: number
}
