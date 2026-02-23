import { type Request, type Response } from 'express'
// 歌单详情

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/playlist/detail'
export async function handler(req: Request, res: Response): Promise<any> {
  const url = '/api/v6/playlist/detail'
  const query = req.body
  if (!query.id || !query.limit)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter id and limit at least, request parameter is ${query}`
    )
  if (!query.id) throw new Error('Need a id')
  const data = {
    id: query.id,
    n: query.limit,
    s: query.s || 8
  }
  const options = {
    crypto: 'eapi',
    cookie: req.cookies,
    headers: {}
  } as const

  const answer = await createRequest(url, data, options)
  // const offset = query.offset || 0;
  // const limit = query.limit || answer.data.playlist.trackIds.length;
  // const trackIds = answer.data.playlist.trackIds;
  // let idsData = {
  //   c: JSON.stringify(
  //     trackIds.slice(offset, offset + limit).map((item) => {
  //       return { id: item.id };
  //     })
  //   ),
  // };
  // const optionsTracks = {
  //   crypto: "weapi",
  //   cookie: req.cookies,
  //   headers: {},
  // };
  // const answerTracks = await createRequest(
  //   "/api/v3/song/detail",
  //   idsData,
  //   optionsTracks
  // );
  // answer.data.playlist.tracks = answerTracks.data.songs;

  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
