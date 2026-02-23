//-----------------------lyric---------------------------------------------------
/**
 * @description: 歌词数据
 */
export interface LyircResponse {
  isPure: boolean
  data: {
    time: number
    text: string
    trans: string
  }[]
  fromCache?: boolean
  code: number
}
