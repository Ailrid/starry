import { createRequest, CryptoMode } from '../../netEase'
import { DatabaseComponent } from '../../components'
import { CacheLyricRequestMessage } from '../message'
import { Body, Cookies, Headers, HttpRequestMessage, HttpSystem, Ok } from '@virid/express'
import { System, Message, SingleMessage } from '@virid/core'
import { type LyricRequest, type LyricResponse } from '../types'
//内部消息
class LyricFromLocalMessage extends HttpRequestMessage {}
class CacheLyricMessage extends SingleMessage {
  constructor(
    public lyricData: {
      id: number
      lyrics: {
        time: number
        text: string
        trans: string
      }[]
      isPure: boolean
    }
  ) {
    super()
  }
}

export class CacheLyricSystem {
  @HttpSystem()
  public static async lyric(
    @Message(CacheLyricRequestMessage) message: CacheLyricRequestMessage,
    @Body() body: LyricRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>,
    dbComponent: DatabaseComponent
  ) {
    const contextId = message.requestId
    const { id, source } = body
    if (source === 'local') return new LyricFromLocalMessage(contextId)

    let resData: LyricResponse
    // 检查缓存
    const cache = dbComponent.db.prepare('SELECT * FROM lyric_cache WHERE id = ?').get(id) as any
    if (cache) {
      //如果有缓存，跳转到缓存system
      resData = {
        isPure: cache.is_pure === 1,
        lyrics: JSON.parse(cache.lyrics_json),
        fromCache: true,
        code: 200
      }
      return Ok(resData)
    }

    // 请求网易云接口
    const data = {
      id,
      cp: false,
      tv: 0,
      lv: 0,
      rv: 0,
      kv: 0,
      yv: 0,
      ytv: 0,
      yrv: 0
    }
    const answer = await createRequest(CryptoMode.eapi, {
      url: '/song/lyric/v1',
      data,
      cookies,
      headers
    })
    const rawData = answer.data
    const isPure = checkPureMusic(rawData)
    let lyrics: any[] = []
    if (!isPure) {
      const lrcMap = extractLyricMap(rawData.lrc?.lyric)
      const tlyricMap = extractLyricMap(rawData.tlyric?.lyric)

      // 合并对齐原词与翻译
      lyrics = Array.from(lrcMap.keys())
        .sort((a, b) => a - b)
        .map((time) => ({
          time,
          text: lrcMap.get(time),
          trans: tlyricMap.get(time) || ''
        }))
    }
    resData = {
      isPure,
      lyrics,
      fromCache: false,
      code: 200
    }
    return [
      //缓存歌词
      new CacheLyricMessage({
        id,
        lyrics,
        isPure
      }),
      //发回响应
      Ok(resData)
    ]
  }
  @HttpSystem({
    messageClass: LyricFromLocalMessage
  })
  public static async lyricFromLocal() {
    //TODO
  }

  @System()
  public static cacheLyric(
    @Message(CacheLyricMessage) message: CacheLyricMessage,
    dbComponent: DatabaseComponent
  ) {
    const { id, lyrics, isPure } = message.lyricData
    // 缓存存入数据库
    dbComponent.db
      .prepare(
        `
      INSERT OR REPLACE INTO lyric_cache (id, lyrics_json, is_pure, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `
      )
      .run(id, JSON.stringify(lyrics), isPure ? 1 : 0)
  }
}
// 修改歌词格式的工具
const parseTime = (timeStr: string): number => {
  const match = timeStr.match(/\[(\d+):(\d+)(?:[.:](\d+))?\]/)
  if (!match) return 0
  const min = parseInt(match[1]!)
  const sec = parseInt(match[2]!)
  const msStr = match[3] || '0'
  const ms = parseInt(msStr)
  const msOffset = msStr.length === 2 ? 100 : 1000
  return parseFloat((min * 60 + sec + ms / msOffset).toFixed(3))
}

const extractLyricMap = (lrc: string = ''): Map<number, string> => {
  const map = new Map<number, string>()
  const lines = lrc.split(/\r?\n/)
  lines.forEach((line) => {
    const timeMatch = line.match(/\[\d+:\d+(?:[.:]\d+)?\]/g)
    // 替换制表符为空格，剔除时间戳
    const content = line
      .replace(/\[\d+:\d+(?:[.:]\d+)?\]/g, '')
      .replace(/\t/g, ' ')
      .trim()
    if (timeMatch && content) {
      timeMatch.forEach((t) => map.set(parseTime(t), content))
    }
  })
  return map
}

const checkPureMusic = (data: any): boolean => {
  if (data.pureMusic) return true
  const lrc = data.lrc?.lyric || ''
  return lrc.includes('纯音乐') || (lrc === '' && !data.tlyric?.lyric)
}
