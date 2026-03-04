import { type EapiHeaders, type RequestConfig, Cookie } from './interface'
import { APP_CONF, USER_AGENT_MAP } from './constant'
import { eapi } from './crypto'
import { serializeCookie } from './util'

export function generateEapiConfig(
  url: string,
  data: any,
  headers: EapiHeaders,
  cookie: Cookie
): RequestConfig {
  // 构造 EAPI设备指纹对象
  const eapiHeader = {
    ...cookie,
    versioncode: '9001071',
    mobilename: '23113RKC6C',
    buildver: cookie.buildver || Date.now().toString().substring(0, 10),
    resolution: cookie.resolution || '2560x1600',
    __csrf: cookie.__csrf || '',
    requestId: `${Date.now()}_${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(4, '0')}`,
    // 身份信息
    ...(cookie.MUSIC_U ? { MUSIC_U: cookie.MUSIC_U } : {}),
    ...(cookie.MUSIC_A ? { MUSIC_A: cookie.MUSIC_A } : {})
  }
  // 构造请求 Headers
  // 将原始 cookie 和新生成的指纹合并后序列化
  headers['Cookie'] = serializeCookie({
    ...cookie,
    ...eapiHeader
  })
  headers['Content-Type'] = 'application/x-www-form-urlencoded'
  headers['User-Agent'] = USER_AGENT_MAP.api.pc
  // 准备加密
  const payload = {
    ...data,
    header: eapiHeader,
    e_r: true //开启响应解密标记
  }
  const apiUrl = url.replace(/^\//, '')
  const cryptoUrl = `/api/${apiUrl}`
  const encryptData = eapi(cryptoUrl, payload)
  const requestUrl = `${APP_CONF.apiDomain}/eapi/${apiUrl}`
  return {
    url: requestUrl,
    method: 'POST',
    headers,
    body: new URLSearchParams(encryptData as any).toString()
  }
}
