export interface SongDetail {
  id: number
  platformId: string
  source: 'netease' | 'local'
  name: string
  artists: { id: number | string; name: string }[]
  album: {
    id: number | string
    name: string
    cover: string
  }
  duration: number // 单位秒
  isAvailable: boolean
  raw?: any // 保留一份原始数据，
}

export interface PlaylistDetail {
  id: number
  name: string
  cover: string
  creator: {
    name: string
    id: string
    avatar: string
  }
  description: string
  songCount: number
  createTime: number
}

export interface LyricDetail {
  isPure: boolean
  lyrics: {
    time: number
    text: string
    trans: string
  }[]
}
