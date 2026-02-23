import { type Request, type Response } from 'express'
import { createRequest } from '../../utils/request.js'
export const apiUrl = '/playmode/intelligence/list'
export async function handler(req: Request, res: Response): Promise<any> {
  const query = req.body
  const url = '/api/playmode/intelligence/list'
  if (!query.id || !query.pid)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter id and pi at least, request parameter is ${query}`
    )
  const data = {
    songId: query.id,
    type: 'fromPlayOne',
    playlistId: query.pid,
    startMusicId: query.sid || query.id,
    count: query.count || 1
  }

  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const

  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
