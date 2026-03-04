import { createRequest, CryptoMode } from '../../utils'
import { Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { UserSubCountRequestMessage } from '../message'
import { type UserSubCountResponse } from '../types'

export class UserSubCountSystem {
  @HttpSystem({
    messageClass: UserSubCountRequestMessage
  })
  public static async getSubCount(
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const answer = await createRequest(CryptoMode.weapi, {
      url: '/subcount', // 移除 /api 前缀
      data: {},
      cookies,
      headers
    })

    return Ok(answer.data as UserSubCountResponse)
  }
}
