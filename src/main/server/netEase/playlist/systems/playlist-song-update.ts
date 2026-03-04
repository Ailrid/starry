import { createRequest, CryptoMode } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { PlaylistSongUpdateRequestMessage } from '../message'
import { type PlaylistSongUpdateRequest } from '../types'

export class PlaylistSongsSystem {
  /**
   * @description 歌单曲目管理 (添加/删除)
   */
  @HttpSystem({
    messageClass: PlaylistSongUpdateRequestMessage
  })
  public static async handleSongs(
    @Body() body: PlaylistSongUpdateRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { pid, op, ids } = body
    const trackIds = JSON.stringify(ids)

    const answer = await createRequest(CryptoMode.eapi, {
      url: '/playlist/manipulate/tracks',
      data: {
        op,
        pid,
        trackIds
      },
      cookies,
      headers
    })

    return Ok({
      code: answer.data?.code || answer.status,
      message: answer.data?.message || 'Operation successful',
      count: answer.data?.count
    })
  }
}
