import { type Request, type Response } from 'express'
// 创建歌单

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/playlist/create'
export async function handler(req: Request, res: Response): Promise<any> {
  const url = '`/api/playlist/create'
  const query = req.body
  if (!query.name)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter name at least, request parameter is ${query}`
    )
  const data = {
    name: query.name,
    privacy: query.privacy || 0, //0 为普通歌单，10 为隐私歌单
    type: query.type || 'NORMAL' // NORMAL|VIDEO|SHARED
  }
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
