import { type Request, type Response } from 'express'
// 歌曲详情

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/playlist/manipulate/update'
export async function handler(req: Request, res: Response): Promise<any> {
  const query = req.body
  const url = '/api/playlist/manipulate/tracks'
  if (!query.ids || !query.pid)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter ids and pid at least, request parameter is ${query}`
    )
  const data = {
    pid: query.pid,
    trackIds: query.ids,
    op: 'update'
  }
  const options = {
    crypto: 'eapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
