import { createRequest, CryptoMode } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { PlaylistDeleteRequestMessage } from '../message'
import { type PlaylistDeleteRequest } from '../types'

export class PlaylistDeleteSystem {
  @HttpSystem({
    messageClass: PlaylistDeleteRequestMessage
  })
  public static async deletePlaylist(
    @Body() body: PlaylistDeleteRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { id } = body

    // 发起请求：注意 url 是 /playlist/remove
    // ids 字段要求是数组格式的字符串
    const answer = await createRequest(CryptoMode.weapi, {
      url: '/playlist/remove',
      data: {
        ids: JSON.stringify([id])
      },
      cookies,
      headers
    })

    return Ok({
      code: answer.status === 200 ? 200 : answer.status,
      message: 'Playlist deleted successfully',
      rawCode: answer.data?.code
    })
  }
}
