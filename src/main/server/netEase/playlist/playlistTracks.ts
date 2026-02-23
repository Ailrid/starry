import { type Request, type Response } from 'express'
// 收藏单曲到歌单 从歌单删除歌曲

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/playlist/tracks'
export async function handler(req: Request, res: Response): Promise<any> {
  const url = '/api/playlist/manipulate/tracks'
  const query = req.body
  if (!query.op || !query.pid || !query.tracks)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter op and pid and tracks at least, request parameter is ${query}`
    )
  const data = {
    op: query.op, // del,add
    pid: query.pid, // 歌单id
    trackIds: JSON.stringify(query.tracks), // 歌曲id
    tracks: '[object Object]'
  }
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
