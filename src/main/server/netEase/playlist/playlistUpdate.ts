import { type Request, type Response } from 'express'
// 编辑歌单

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/playlist/update'
export async function handler(req: Request, res: Response): Promise<any> {
  const url = '/api/batch'
  const query = req.body
  if (!query.id || !query.desc || !query.name)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter id and desc and name at least, request parameter is ${query}`
    )
  const data = {
    '/api/playlist/desc/update': `{"id":${query.id},"desc":"${query.desc}"}`,
    '/api/playlist/tags/update': `{"id":${query.id},"tags":"${query.tags}"}`,
    '/api/playlist/update/name': `{"id":${query.id},"name":"${query.name}"}`
  }

  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
