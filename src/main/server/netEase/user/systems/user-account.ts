import { createRequest, CryptoMode } from '../../utils'
import { Cookies, Headers, HttpSystem, Ok } from '@virid/express'
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
    const answer = await createRequest(CryptoMode.weapi, {
      url: '/nuser/account/get',
      data: {},
      cookies,
      headers
    })
    const raw = answer.data
    if (!raw.profile) return Ok({ code: raw.code, profile: null, account: null })

    // 转换为标准 UserProfile
    const profile: UserProfile = {
      userId: raw.profile.userId,
      nickname: raw.profile.nickname,
      avatar: raw.profile.avatarUrl,
      background: raw.profile.backgroundUrl,
      signature: raw.profile.signature,
      gender: raw.profile.gender,
      birthday: raw.profile.birthday,
      vipType: raw.profile.vipType,
      createTime: raw.profile.createTime
    }

    return Ok({
      code: 200,
      account: {
        id: raw.account.id,
        userName: raw.account.userName,
        vipType: raw.account.vipType
      },
      profile
    } as UserAccountResponse)
  }
}
