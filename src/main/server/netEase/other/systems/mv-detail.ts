import { createRequest, CryptoMode } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { MvDetailRequestMessage } from '../message'
import { type MvDetailRequest, type MvDetailResponse } from '../types'

export class MvDetailSystem {
  @HttpSystem({
    messageClass: MvDetailRequestMessage
  })
  public static async getMvDetail(
    @Body() body: MvDetailRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { id } = body

    // 发起请求：去掉 /api，网易云 MV 详情标准的 v1 路径
    const answer = await createRequest(CryptoMode.weapi, {
      url: '/v1/mv/detail',
      data: { id },
      cookies,
      headers
    })

    // 返回强类型响应
    return Ok(answer.data as MvDetailResponse)
  }
}
