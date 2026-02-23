import { type Request, type Response } from 'express'
// 删除歌单

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/playlist/delete'
export async function handler(req: Request, res: Response): Promise<any> {
  const url = '/api/playlist/remove'
  const query = req.body
  if (!query.id)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter id at least, request parameter is ${query}`
    )
  const data = {
    ids: '[' + query.id + ']'
  }
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
