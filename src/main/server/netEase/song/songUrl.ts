import { type Request, type Response } from 'express'
// 歌曲链接 - v1
// 此版本不再采用 br 作为音质区分的标准
// 而是采用 standard, exhigh, lossless, hires, jyeffect(高清环绕声), sky(沉浸环绕声), jymaster(超清母带) 进行音质判断

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/song/url'
export async function handler(req: Request, res: Response): Promise<any> {
  const query = req.body

  const url = '/api/song/enhance/player/url/v1'
  if (!query.ids || !query.level)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter ids and level at least, request parameter is ${query}`
    )
  const data: Data = {
    ids: JSON.stringify(query.ids),
    level: query.level,
    encodeType: 'mp3'
  }
  if (data.level == 'sky') {
    data.immerseType = 'c51'
  }
  const options = {
    crypto: 'eapi',
    cookie: { ...req.cookies, os: 'pc' },
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}

interface Data {
  ids: string
  level: string
  encodeType: string
  immerseType?: string
}
