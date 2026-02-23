import { type Request, type Response } from 'express'
import { createRequest } from '../../utils/request.js'

export const apiUrl = '/login/qr/key'

export async function handler(req: Request, res: Response): Promise<any> {
  const url = '/api/login/qrcode/unikey'
  const data = {
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
