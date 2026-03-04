import { createRequest, CryptoMode, convertSongDetail, type SongDetail } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { UserRecordRequestMessage } from '../message'
import { type UserRecordRequest, type UserRecordResponse, type PlayRecord } from '../types'

export class UserRecordSystem {
  @HttpSystem({
    messageClass: UserRecordRequestMessage
  })
  public static async getRecord(
    @Body() body: UserRecordRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { uid, type = 0 } = body

    const answer = await createRequest(CryptoMode.weapi, {
      url: '/v1/play/record',
      data: { uid, type },
      cookies,
      headers
    })

    const rawData = answer.data as RawUserRecordResponse
    const isWeek = type === 1
    const rawList = (isWeek ? rawData.weekData : rawData.allData) || []

    const formattedSongs: SongDetail[] = convertSongDetail({
      songs: rawList.map((item) => item.song),
      privileges: rawList.map((item) => item.song.privilege || { id: item.song.id }),
      code: 200
    } as any)

    // 重新包装成标准 PlayRecord 格式
    const records: PlayRecord[] = rawList.map((item, index) => ({
      playCount: item.playCount,
      score: item.score,
      song: formattedSongs[index]
    }))

    return Ok({
      code: 200,
      [isWeek ? 'weekData' : 'allData']: records
    } as UserRecordResponse)
  }
}

/**
 * @description: 用户最近播放歌曲
 */
interface RawPlayRecord {
  playCount: number
  score: number
  song: {
    name: string
    id: number
    ar: {
      id: number
      name: string
      tns: string[]
      alias: string[]
    }[]
    alia: string[]
    al: {
      id: number
      name: string
      picUrl: string
      tns: string[]
      [key: string]: any
    }
    dt: number
    publishTime: number
    tns: string[]
    privilege: {
      id: number
      [key: string]: any
    }
    [key: string]: any
  }
}

/**
 * @description: 用户最近播放记录返回数据
 */
interface RawUserRecordResponse {
  weekData?: RawPlayRecord[]
  allData?: RawPlayRecord[]
  code: number
}
