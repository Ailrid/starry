import { type Request, type Response } from 'express'
// 收藏/取消收藏专辑
// 用法：
// POST /api/album/sub?id=&type=sub
// 参数：
// id: 专辑id
// type: sub 或 unsub

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/album/sub'
export async function handler(req: Request, res: Response): Promise<any> {
  const query = req.body
  if (!query.id || !query.type)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter id, request parameter is ${query}`
    )
  const url = `/api/album/${query.type}`
  const data = {
    id: query.id
  }
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
