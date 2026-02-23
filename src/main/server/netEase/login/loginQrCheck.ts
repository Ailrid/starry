import { type Request, type Response } from 'express'
import { createRequest } from '../../utils/request.js'

export const apiUrl = '/login/qr/check'

export async function handler(req: Request, res: Response): Promise<any> {
  const url = '/api/login/qrcode/client/login'
  const query = req.body

  if (!query.unikey)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter unikey, request parameter is ${query}`
    )
  const data = {
    key: query.unikey,
    type: 3
  }

  const options = {
    crypto: 'eapi',
    cookie: req.cookies,
    headers: {}
  } as const

  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
