import { type Request, type Response } from 'express'
// MV链接

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/mv/url'
export async function handler(req: Request, res: Response): Promise<any> {
  const url = '/api/song/enhance/play/mv/url'
  const query = req.body
  if (!query.id)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter id at least, request parameter is ${query}`
    )
  if (!query.id) throw new Error('Need a id')
  const data = {
    id: query.id,
    r: query.r || 1080
  }
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
