import { type Request, type Response } from 'express'
// 获取 VIP 信息

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/vip'
export async function handler(req: Request, res: Response): Promise<any> {
  const url = '/api/music-vip-membership/client/vip/info'
  const query = req.body
  if (!query.uid)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter uid at least, request parameter is ${query}`
    )
  const data = {
    userId: query.uid || ''
  }
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
