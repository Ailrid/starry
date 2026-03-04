import { renderSVG } from 'uqr'
import { Body, HttpSystem, Ok } from '@virid/express'
import { LoginQrCreateRequestMessage } from '../message'
import { type LoginQrCreateRequest } from '../types'

export class LoginQrCreateSystem {
  @HttpSystem({
    messageClass: LoginQrCreateRequestMessage
  })
  public static async createQrCode(@Body() body: LoginQrCreateRequest) {
    const { unikey } = body

    // 拼接网易云标准的二维码跳转 URL
    const qrUrl = `https://music.163.com/login?codekey=${unikey}`

    // 使用 uqr 生成 SVG，直接组装成前端需要的格式
    const answer = {
      qrurl: qrUrl,
      qrsvg: renderSVG(qrUrl)
    }

    return Ok(answer)
  }
}
