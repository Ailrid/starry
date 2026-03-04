import { createRequest, CryptoMode } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { CommentRequestMessage } from '../message'
import { type CommentRequest } from '../types'

export class CommentSystem {
  @HttpSystem({
    messageClass: CommentRequestMessage
  })
  public static async executeComment(
    @Body() body: CommentRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { t, id, content, commentId } = body

    // 这里的 R_SO_4_ 是歌曲评论的标识，如果以后支持 MV 或专辑，这里可以再扩展
    const data: Record<string, any> = {
      threadId: `R_SO_4_${id}`
    }

    // 3. 根据动作类型动态注入参数
    if (t === 'add') {
      data.content = content
    } else if (t === 'delete') {
      data.commentId = commentId
    } else if (t === 'reply') {
      data.commentId = commentId
      data.content = content
    }
    const answer = await createRequest(CryptoMode.weapi, {
      url: `/resource/comments/${t}`,
      data,
      cookies,
      headers
    })

    return Ok(answer.data)
  }
}
