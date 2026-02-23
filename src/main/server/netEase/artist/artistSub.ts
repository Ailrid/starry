import { type Request, type Response } from 'express'
// 已收藏专辑列表
import { createRequest } from '../../utils/request.js'

export const apiUrl = '/artist/sub'
export async function handler(req: Request, res: Response): Promise<any> {
  const query = req.body
  if (!query.id || !query.type)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter id and type, request parameter is ${query}`
    )
  const url = '/api/artist/' + query.type

  const data = {
    artistId: query.id,
    artistIds: '[' + query.id + ']'
  }
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
