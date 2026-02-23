import { type Request, type Response } from 'express'
// 红心与取消红心歌曲
import { createRequest } from '../../utils/request.js'

export const apiUrl = '/song/like'
export async function handler(req: Request, res: Response): Promise<any> {
  const query = req.body
  const url = '/api/radio/like'
  if (!query.id)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter id at least, request parameter is ${query}`
    )
  const data = {
    alg: 'itembased',
    trackId: query.id,
    like: query.like,
    time: '3'
  }
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
