import { type Request, type Response } from 'express'
// 搜索建议

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/search/suggest'
export async function handler(req: Request, res: Response): Promise<any> {
  const query = req.body
  const url = '/api/search/suggest/'
  if (!query.keywords)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter keywords at least, request parameter is ${query}`
    )

  const data = {
    s: query.keywords || ''
  }
  const type = query.type == 'mobile' ? 'keyword' : 'web'
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url + '/' + type, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
