import { type Request, type Response } from 'express'
// 歌手单曲

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/artist'
export async function handler(req: Request, res: Response): Promise<any> {
  const query = req.body
  if (!query.id)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter id, request parameter is ${query}`
    )
  const url = `/api/v1/artist/${query.id}`
  const data = {}
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
