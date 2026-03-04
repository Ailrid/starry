import { type ApiHeaders, type RequestConfig, Cookie } from './interface'
import { APP_CONF, USER_AGENT_MAP } from './constant'
import { serializeCookie } from './util'

export function generateApiConfig(
  url: string,
  data: any,
  headers: ApiHeaders,
  cookie: Cookie
): RequestConfig {
  // 1. 构造与 eapi 完全一致的设备指纹 (Fingerprint)
  const apiFingerprint = {
    osver: cookie.osver || '',
    deviceId: cookie.deviceId || '',
    os: cookie.os || 'android',
    appver: cookie.appver || '',
    versioncode: cookie.versioncode || '140',
    mobilename: cookie.mobilename || '',
    buildver: cookie.buildver || Date.now().toString().substring(0, 10),
    resolution: cookie.resolution || '1920x1080',
    __csrf: cookie.__csrf || '',
    channel: cookie.channel || '',
    requestId: `${Date.now()}_${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(4, '0')}`,
    ...(cookie.MUSIC_U ? { MUSIC_U: cookie.MUSIC_U } : {}),
    ...(cookie.MUSIC_A ? { MUSIC_A: cookie.MUSIC_A } : {})
  }
  headers['User-Agent'] =
    headers['User-Agent'] || USER_AGENT_MAP.api?.android || USER_AGENT_MAP.api.pc
  headers['Content-Type'] = 'application/x-www-form-urlencoded'

  const fullCookie = {
    ...cookie,
    ...apiFingerprint
  }
  headers['Cookie'] = serializeCookie(fullCookie)

  const apiPath = url.replace(/^\//, '')
  const requestUrl = `${APP_CONF.apiDomain}/${apiPath}`

  return {
    url: requestUrl,
    method: 'POST',
    headers,
    body: new URLSearchParams(data as any).toString()
  }
}
