import { type Request, type Response } from 'express'
import { createRequest } from '../../utils/request.js'

export const apiUrl = '/mv'
export async function handler(req: Request, res: Response): Promise<any> {
  const url = '/api/v1/mv/detail'
  const query = req.body
  if (!query.id)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter id at least, request parameter is ${query}`
    )
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
