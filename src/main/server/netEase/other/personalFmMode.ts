import { type Request, type Response } from 'express'
// 私人FM - 模式选择

// aidj, DEFAULT, FAMILIAR, EXPLORE, SCENE_RCMD ( EXERCISE, FOCUS, NIGHT_EMO  )
// 来不及解释这几个了

import { createRequest } from '../../utils/request.js'

export const apiUrl = '/fm/mode'
export async function handler(req: Request, res: Response): Promise<any> {
  const url = '/api/v1/radio/get'
  const query = req.body
  if (!query.mode || !query.submode)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter mode and submode at least, request parameter is ${query}`
    )
  const data = {
    mode: query.mode,
    subMode: query.submode,
    limit: query.limit || 3
  }
  const options = {
    crypto: 'eapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}
