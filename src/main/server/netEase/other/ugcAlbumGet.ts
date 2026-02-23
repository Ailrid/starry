import { type Request, type Response } from 'express'
// 专辑简要百科信息

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/album/wiki'
export async function handler(req: Request, res: Response) {
  const url = '/api/rep/ugc/album/get'
  const query = req.body
  if (!query.id)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter id at least, request parameter is ${query}`
    )
  const data = {
    albumId: query.id
  }
  const options = {
    crypto: 'eapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
