export enum CryptoMode {
  weapi = 'weapi',
  eapi = 'eapi',
  api = 'api'
}
export interface RequestOptions<T extends CryptoMode> {
  url: string
  data: any
  // 关键：根据传入的 T，从映射表中提取对应的 Header 类型
  headers: CryptoHeaderMap[T]
  cookies: Cookie
}
// 核心：建立映射表
export interface CryptoHeaderMap {
  weapi: WeapiHeaders
  eapi: EapiHeaders
  api: ApiHeaders
}
// 基础 Header：所有请求通用的伪装
export interface BaseHeaders {
  'User-Agent'?: string
  Cookie?: string
  'Content-Type'?: string
}

// WEAPI 额外需要 Referer 验证
export interface WeapiHeaders extends BaseHeaders {
  Referer?: string
}

// EAPI 的核心是在 Cookie 中携带一套完整的设备信息
export interface EapiHeaders extends BaseHeaders {
  // EAPI 的 Header 通常在 Cookie 中通过特殊字段体现
  MUSIC_U?: string
  MUSIC_A?: string
}

export type ApiHeaders = EapiHeaders

export interface Cookie extends Record<string, string | undefined> {
  MUSIC_U?: string // 登录状态
  MUSIC_A?: string // 匿名/游客 Token
  __csrf?: string // 对应 weapi 的 csrf_token
  __remember_me?: string
  os?: 'pc' | 'android' | 'iphone' | 'linux'
  osver?: string // 系统版本
  appver?: string // App 版本
  channel?: string // 渠道
  deviceId?: string // 设备 ID
  _ntes_nuid?: string // 随机生成的 32 位字符串
  _ntes_nnid?: string // nuid + 时间戳
  WNMCID?: string // 随机生成的设备追踪 ID
  WEVNSM?: string // 版本标志，通常固定为 1.0.0
}

export interface RequestConfig {
  url: string
  method: 'POST' // 网易云加密接口基本全是 POST
  headers: WeapiHeaders | EapiHeaders | ApiHeaders
  body: any
}
