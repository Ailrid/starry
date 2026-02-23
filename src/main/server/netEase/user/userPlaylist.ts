import { type Request, type Response } from 'express'
// 用户歌单

import { createRequest } from '../../utils/request.js'
export const apiUrl = '/user/playlist'
export async function handler(req: Request, res: Response): Promise<any> {
  const url = '/api/user/playlist'
  const query = req.body
  if (!query.uid)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter uid at least, request parameter is ${query}`
    )
  const data = {
    uid: query.uid,
    limit: query.limit || 30,
    offset: query.offset || 0,
    includeVideo: true
  }
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
