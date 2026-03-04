import { createRequest, CryptoMode } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { PlaylistOrderUpdateRequestMessage } from '../message'
import { type PlaylistOrderUpdateRequest } from '../types'

export class PlaylistOrderUpdateSystem {
  @HttpSystem({
    messageClass: PlaylistOrderUpdateRequestMessage
  })
  public static async updatePlaylistOrder(
    @Body() body: PlaylistOrderUpdateRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { ids } = body

    const answer = await createRequest(CryptoMode.weapi, {
      url: '/playlist/order/update',
      data: {
        ids: typeof ids === 'string' ? ids : JSON.stringify(ids)
      },
      cookies,
      headers
    })

    return Ok({
      code: answer.data?.code || answer.status,
      message: answer.data?.code === 200 ? 'Order updated successfully' : 'Update failed'
    })
  }
}
