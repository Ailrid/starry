import { type Request, type Response } from 'express'
// 已收藏专辑列表
import { createRequest } from '../../utils/request.js'

export const apiUrl = '/artist/sublist'
export async function handler(req: Request, res: Response): Promise<any> {
  const query = req.body
  const url = '/api/artist/sublist'
  const data = {
    limit: query.limit || 100,
    offset: query.offset || 0,
    total: true
  }
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
