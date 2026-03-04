import { createRequest, CryptoMode } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { VipInfoRequestMessage } from '../message'
import { type VipInfoRequest, type VipInfoResponse } from '../types'

export class VipInfoSystem {
  @HttpSystem({
    messageClass: VipInfoRequestMessage
  })
  public static async getVipInfo(
    @Body() body: VipInfoRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { uid } = body

    const answer = await createRequest(CryptoMode.weapi, {
      url: '/music-vip-membership/client/vip/info',
      data: {
        userId: uid
      },
      cookies,
      headers
    })

    const rawData = answer.data?.data || {}

    // 构造一个干净的、符合你标准的 VIP 状态模型
    const formattedVip = {
      userId: rawData.userId,
      isVip: rawData.associator?.vipCode > 0 || rawData.musicPackage?.vipCode > 0,
      redVipLevel: rawData.redVipLevel,
      // 提取核心过期时间
      details: {
        blackVip: {
          code: rawData.associator?.vipCode,
          expire: rawData.associator?.expireTime
        },
        musicPackage: {
          code: rawData.musicPackage?.vipCode,
          expire: rawData.musicPackage?.expireTime
        }
      }
    }

    return Ok({
      code: 200,
      data: formattedVip
    } as VipInfoResponse)
  }
}
