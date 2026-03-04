import { createRequest, CryptoMode } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { ArtistSubRequestMessage } from '../message'
import { type ArtistSubRequest } from '../types'

export class ArtistSubSystem {
  @HttpSystem({
    messageClass: ArtistSubRequestMessage
  })
  public static async subscribeArtist(
    @Body() body: ArtistSubRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { id, type } = body

    // 根据 type (sub/unsub) 动态拼接 URL，去掉 /api
    const url = `/artist/${type}`

    const answer = await createRequest(CryptoMode.weapi, {
      url,
      data: {
        artistId: id,
        artistIds: `[${id}]`
      },
      cookies,
      headers
    })

    return Ok(answer.data)
  }
}
