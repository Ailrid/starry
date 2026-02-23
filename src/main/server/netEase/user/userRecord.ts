import { type Request, type Response } from 'express'
// 听歌排行
import { createRequest } from '../../utils/request.js'

export const apiUrl = '/user/record'
export async function handler(req: Request, res: Response): Promise<any> {
  const url = '/api/v1/play/record'
  const query = req.body
  if (!query.uid)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter uid at least, request parameter is ${query}`
    )
  const data = {
    uid: query.uid,
    type: query.type || 0 // 1: 最近一周, 0: 所有时间
  }
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
