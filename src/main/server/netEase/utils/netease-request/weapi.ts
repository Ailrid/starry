import { type WeapiHeaders, type RequestConfig, Cookie } from './interface'
import { APP_CONF, USER_AGENT_MAP } from './constant'
import { weapi } from './crypto'
import { serializeCookie } from './util' // 别忘了实现这个

export function generateWeapiConfig(
  url: string,
  data: any,
  headers: WeapiHeaders,
  cookie: Cookie
): RequestConfig {
  // 设置标准的 WEAPI Header
  headers['Referer'] = APP_CONF.domain
  headers['User-Agent'] = headers['User-Agent'] || USER_AGENT_MAP.weapi.pc
  headers['Content-Type'] = 'application/x-www-form-urlencoded'

  // 序列化 Cookie 并注入
  headers['Cookie'] = serializeCookie(cookie)

  // 准备加密数据 (Weapi 必须包含 csrf_token)
  data.csrf_token = cookie.__csrf || ''
  const encryptData = weapi(data)

  // 规范化请求 URL
  const apiPath = url.replace(/^\//, '')
  const requestUrl = `${APP_CONF.domain}/weapi/${apiPath}`

  return {
    url: requestUrl,
    method: 'POST',
    headers,
    body: new URLSearchParams(encryptData as any).toString()
  }
}
