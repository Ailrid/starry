import { createRequest, CryptoMode } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { UserDetailRequestMessage } from '../message'
import { type UserDetailRequest, type UserDetailResponse, type UserProfile } from '../types'

export class UserDetailSystem {
  @HttpSystem({
    messageClass: UserDetailRequestMessage
  })
  public static async getDetail(
    @Body() body: UserDetailRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { uid } = body

    const answer = await createRequest(CryptoMode.weapi, {
      url: `/v1/user/detail/${uid}`,
      data: {},
      cookies,
      headers
    })

    const raw = answer.data

    // 映射到统一的 UserProfile 模型
    const profile: UserProfile = {
      userId: raw.profile.userId,
      nickname: raw.profile.nickname,
      avatar: raw.profile.avatarUrl,
      background: raw.profile.backgroundUrl,
      signature: raw.profile.signature,
      gender: raw.profile.gender,
      birthday: raw.profile.birthday,
      vipType: raw.profile.vipType,
      // Detail 接口特有的社交数据
      followeds: raw.profile.followeds || 0,
      follows: raw.profile.follows || 0,
      followed: raw.profile.followed || false,
      // 详情特有的等级和成长数据
      level: raw.level,
      listenSongs: raw.listenSongs,
      createTime: raw.createTime,
      createDays: raw.createDays
    }

    return Ok({
      code: 200,
      profile
    } as UserDetailResponse)
  }
}
