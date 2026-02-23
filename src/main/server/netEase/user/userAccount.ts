import { type Request, type Response } from 'express'
import { createRequest } from '../../utils/request.js'

export const apiUrl = '/user/account'
export async function handler(req: Request, res: Response): Promise<any> {
  const url = '/api/nuser/account/get'
  const data = {}
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
