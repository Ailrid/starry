import { createRequest, CryptoMode } from '../../utils'
import { Cookies, Headers, HttpSystem, Ok, InternalServerError } from '@virid/express'
import { UserAccountRequestMessage } from '../message'
import { type UserAccountResponse, type UserProfile } from '../types'

export class UserAccountSystem {
  @HttpSystem({
    messageClass: UserAccountRequestMessage
  })
  public static async getAccount(
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const rawAnswer = await createRequest(CryptoMode.weapi, {
      url: '/nuser/account/get',
      data: {},
      cookies,
      headers
    })
    const rawData = rawAnswer.data
    if (!rawData.account) return InternalServerError('Cannot get user account, account is null')

    const answer = await createRequest(CryptoMode.weapi, {
      url: `/v1/user/detail/${rawData.account.id}`,
      data: {},
      cookies,
      headers
    })
    const data = answer.data
    // 映射到统一的 UserProfile 模型
    const profile: UserProfile = {
      userId: data.profile.userId,
      nickname: data.profile.nickname,
      avatar: data.profile.avatarUrl,
      background: data.profile.avatarUrl,
      signature: data.profile.signature,
      gender: data.profile.gender,
      birthday: data.profile.birthday,
      vipType: data.profile.vipType,
      // Detail 接口特有的社交数据
      followeds: data.profile.followeds || 0,
      follows: data.profile.follows || 0,
      followed: data.profile.followed || false,
      // 详情特有的等级和成长数据
      level: data.level,
      listenSongs: data.listenSongs,
      createTime: data.createTime,
      createDays: data.createDays
    }

    return Ok({
      code: 200,
      profile
    } as UserAccountResponse)
  }
}
