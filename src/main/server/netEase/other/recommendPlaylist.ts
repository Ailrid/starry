import { type Request, type Response } from 'express'
// 每日推荐歌单

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/recommend/playlists'
export async function handler(req: Request, res: Response): Promise<any> {
  const url = '/api/v1/discovery/recommend/resource'
  const data = {}
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
