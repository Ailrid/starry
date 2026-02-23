import { type Request, type Response } from 'express'
// 用户详情

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/user/subcount'
export async function handler(req: Request, res: Response): Promise<any> {
  const url = '/api/subcount'
  const data = {}
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
