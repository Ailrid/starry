import { createRequest, CryptoMode } from '../../netEase'
import {
  Body,
  Cookies,
  Headers,
  HttpSystem,
  Ok,
  InternalServerError,
  HttpRequestMessage,
  type RequestId
} from '@virid/express'
import { Message } from '@virid/core'
import { type SongUrlRequest, type SongUrlResponse } from '../types'
import { DatabaseComponent } from '../../components'
import { CacheSongUrlRequestMessage } from '../message'

class UrlFromLocalMessage extends HttpRequestMessage {
  constructor(
    requestId: RequestId,
    public songId: number
  ) {
    super(requestId)
  }
}

export class CacheSongUrlSystem {
  //用于暂存url的map
  static urlMap: Map<number, string> = new Map()
  @HttpSystem()
  public static async songUrl(
    @Message(CacheSongUrlRequestMessage) message: CacheSongUrlRequestMessage,
    @Body() body: SongUrlRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { id, level, source } = body

    // 如果是本地歌曲的url，转发http请求
    const requestId = message.requestId
    if (source == 'local') return new UrlFromLocalMessage(requestId, id)

    // 否则是网易云的，开始处理
    const data = {
      ids: JSON.stringify([id]),
      level: level,
      encodeType: 'mp3',
      immerseType: level == 'sky' ? 'c51' : 'standard'
    }
    const answer = await createRequest(CryptoMode.eapi, {
      url: '/song/enhance/player/url/v1',
      data,
      cookies,
      headers
    })
    const rawResponse: RawSongUrlResponse = answer.data
    //记录一下这个url
    CacheSongUrlSystem.urlMap.set(id, rawResponse.data[0].url)
    //根据网易云的返回数据进行转换
    const response: SongUrlResponse = {
      data: {
        id: id,
        url: `/cache/songs/data?id=${id}&md5=${rawResponse.data[0].md5 || ''}&source=netease`,
        md5: rawResponse.data[0].md5,
        size: rawResponse.data[0].size,
        br: rawResponse.data[0].br,
        level: rawResponse.data[0].level
      },
      code: 200
    }

    return Ok(response)
  }

  @HttpSystem()
  public static async songUrlFromLocal(
    @Message(UrlFromLocalMessage) _message: UrlFromLocalMessage,
    _dbComponent: DatabaseComponent
  ) {
    // const id = message.songId
    //在这里应该查找然后播放
    //TODO
    return InternalServerError('Not implemented')
  }
}

/**
 * * 原始歌曲url返回数据
 */
interface RawSongUrlResponse {
  data: {
    id: number
    url: string
    br: number
    size: number
    md5: string
    type: string
    level: 'standard' | 'higher' | 'exhigh' | 'lossless' | 'hires' | 'sky'
    time: number
    gain: number
    sr: number
    [key: string]: any
  }[]
  code: number
}
