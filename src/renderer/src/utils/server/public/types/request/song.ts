//-----------------------song_detail---------------------------------------------------
/**
 * @description: 音乐详情
 */
export interface SongDetailRequest {
  ids: { id: number }[]
}
//-----------------------song_url---------------------------------------------------
/**
 * @description: 歌曲url
 * standard, exhigh, lossless, hires, jyeffect(高清环绕声), sky(沉浸环绕声), jymaster(超清母带)
 */
export interface SongUrlRequest {
  id: number
  level: 'standard' | 'exhigh' | 'lossless' | 'hires' | 'jyeffect' | 'sky' | 'jymaster'
  source: 'local' | 'netease'
}
