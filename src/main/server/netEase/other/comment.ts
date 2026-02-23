import { type Request, type Response } from 'express'
import { createRequest } from '../../utils/request.js'
export const apiUrl = '/comments'
export async function handler(req: Request, res: Response): Promise<any> {
  const query = req.body

  if (!query.t || !query.id)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter t and id, request parameter is ${query}`
    )
  const url = `/api/resource/comments/${query.t}`

  const data: CommentData = {
    threadId: 'R_SO_4_' + query.id
  }

  if (query.t == 'add') data.content = query.content
  else if (query.t == 'delete') data.commentId = query.commentId
  else if (query.t == 'reply') {
    data.commentId = query.commentId
    data.content = query.content
  }
  const options = {
    crypto: 'weapi',
    cookie: req.cookies,
    headers: {}
  } as const
  const answer = await createRequest(url, data, options)
  return res.set('Set-Cookie', answer.cookie).status(answer.status).json(answer.data)
}

interface CommentData {
  threadId: string
  content?: string
  commentId?: string
}
