import { type Request, type Response } from 'express'
// 歌手专辑列表

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/artist/songs'
export async function handler(req: Request, res: Response): Promise<any> {
  const query = req.body
  if (!query.id)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter id, request parameter is ${query}`
    )
  const url = '/api/v1/artist/songs'
  const data = {
    id: query.id,
    private_cloud: 'true',
    work_type: 1,
    order: query.order || 'hot', //hot,time
    offset: query.offset || 0,
    limit: query.limit || 100
  }
  const options = {
    crypto: 'eapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)

  const tracksID = answer.data.songs.map((item: any) => {
    return { id: item.id }
  })

  const idsData = {
    c: JSON.stringify(tracksID)
  }
  const optionsTracks = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answerTracks = await createRequest('/api/v3/song/detail', idsData, optionsTracks)
  answer.data.songs = answerTracks.data.songs

  return res.set('Set-Cookie', answerTracks.cookie).status(answerTracks.status).json(answer.data)
}
