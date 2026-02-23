import { type Request, type Response } from 'express'
// 用户详情

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/user/detail'
export async function handler(req: Request, res: Response): Promise<any> {
  const url = '/api/v1/user/detail'
  const query = req.body
  if (!query.uid)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter uid at least, request parameter is ${query}`
    )
  const data = {}
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url + '/' + query.uid, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
