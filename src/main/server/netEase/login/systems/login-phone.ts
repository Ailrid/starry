import { createHash } from 'node:crypto' // 使用原生 crypto
import { createRequest, CryptoMode } from '../../utils'
import { Body, Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { LoginCellphoneRequestMessage } from '../message'
import { type LoginCellphoneRequest } from '../types'

export class LoginCellphoneSystem {
  @HttpSystem({
    messageClass: LoginCellphoneRequestMessage
  })
  public static async login(
    @Body() body: LoginCellphoneRequest,
    @Cookies() cookies: Record<string, string>,
    @Headers() headers: Record<string, string>
  ) {
    const { phone, password, md5_password, captcha, countrycode = '86' } = body

    const authField = captcha ? 'captcha' : 'password'

    // 原生 MD5 实现
    let authValue = ''
    if (captcha) {
      authValue = captcha.toString()
    } else {
      authValue = md5_password || createHash('md5').update(password!).digest('hex')
    }

    const data = {
      phone,
      countrycode,
      [authField]: authValue,
      rememberLogin: 'true',
      type: '1',
      https: 'true'
    }
    const answer = await createRequest(CryptoMode.eapi, {
      url: '/w/login/cellphone',
      data,
      cookies,
      headers
    })

    let neteaseData = answer.data

    // 字段清洗逻辑
    if (neteaseData && neteaseData.code === 200) {
      neteaseData = JSON.parse(
        JSON.stringify(neteaseData).replace(/avatarImgId_str/g, 'avatarImgIdStr')
      )
    }

    return Ok(neteaseData, {
      'Set-Cookies': answer.cookies
    })
  }
}
