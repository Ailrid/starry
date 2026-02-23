import { type Request, type Response } from 'express'
// 搜索

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/search'
export async function handler(req: Request, res: Response): Promise<any> {
  const query = req.body
  const url = '/api/search/get'
  if (!query.keywords || !query.type)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter keywords and type at least, request parameter is ${query}`
    )
  const data = {
    s: query.keywords,
    type: query.type, // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
    limit: query.limit || 30,
    offset: query.offset || 0
  }
  const options = {
    crypto: 'eapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
