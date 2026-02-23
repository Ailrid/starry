import { type Request, type Response } from 'express'
// 歌曲是否喜爱
import { createRequest } from '../../utils/request.js'

export const apiUrl = '/song/like/check'
export async function handler(req: Request, res: Response): Promise<any> {
  const query = req.body
  const url = '/api/song/like/check'
  if (!query.ids)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter ids at least, request parameter is ${query}`
    )
  const data = {
    trackIds: query.ids
  }
  const options = {
    crypto: 'eapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
