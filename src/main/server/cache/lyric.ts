import { type Request, type Response } from 'express'
import { createRequest } from '../utils/request.js'
import { dbComponent } from '@main/server/db.js'

export const apiUrl = '/lyric'
export async function handler(req: Request, res: Response): Promise<any> {
  const { id, source } = req.body
  if (source === 'local') {
    // 如果是本地文件的歌词，应该读取这个文件的歌词然后返回
    //TODO
  } else {
    // 检查缓存
    const cache = dbComponent.db.prepare('SELECT * FROM lyric_cache WHERE id = ?').get(id) as any
    if (cache) {
      return res.json({
        isPure: !!cache.is_pure,
        lyrics: JSON.parse(cache.lyrics_json),
        code: 200
      })
    }

    // 请求网易云接口
    const data = { id, cp: false, tv: 0, lv: 0, rv: 0, kv: 0, yv: 0, ytv: 0, yrv: 0 }
    const options = { crypto: 'eapi', cookie: req.cookies, headers: {} } as const
    const answer = await createRequest('/api/song/lyric/v1', data, options)

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
    // 缓存存入数据库
    try {
      dbComponent.db
        .prepare(
          `
      INSERT OR REPLACE INTO lyric_cache (id, lyrics_json, is_pure, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
    `
        )
        .run(id, JSON.stringify(lyrics), isPure ? 1 : 0)
    } catch (err) {
      console.error('Lyric cache save failed:', err)
    }

    return res.status(answer.status).json({ isPure, lyrics, code: 200 })
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
  return lrc.includes('纯音乐，请欣赏') || (lrc === '' && !data.tlyric?.lyric)
}
