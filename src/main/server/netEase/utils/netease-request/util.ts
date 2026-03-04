import { randomBytes } from 'node:crypto'
import { Cookie } from './interface'
import { OS_CONFIG } from './constant'

/**
 * 补全网易云所需的 Cookie 身份指纹
 * @param initialCookie 初始 Cookie（可能是空对象）
 * @param url 当前请求的路径（用于判断是否注入 NMTID）
 */
export function generateCookie(initialCookie: Cookie, url: string = ''): Cookie {
  const nuid = initialCookie._ntes_nuid || randomBytes(32).toString('hex')
  const osType = initialCookie.os || 'android'
  const osDefault = OS_CONFIG[osType]
  const fullCookie: Cookie = {
    ...initialCookie,
    __remember_me: 'true',
    ntes_kaola_ad: '1',
    _ntes_nuid: nuid,
    _ntes_nnid: `${nuid},${Date.now()}`,
    osver: initialCookie.osver || osDefault.osver,
    deviceId: initialCookie.deviceId || 'undefined',
    os: initialCookie.os || osDefault.os,
    channel: initialCookie.channel || 'netease',
    appver: initialCookie.appver || osDefault.appver
  }

  // 非登录接口注入 NMTID
  if (!url.includes('login')) {
    fullCookie['NMTID'] = randomBytes(16).toString('hex')
  }

  return fullCookie
}

/**
 * 清洗 Header：剔除本地开发环境头、长度头、Host等危险字段
 * 防止网易云接口卡死或 403
 */
export function filterHeaders(
  rawHeaders: Record<string, string | undefined>
): Record<string, string> {
  const cleanHeaders: Record<string, string> = {}

  const forbiddenKeys = [
    'host', // 会指向 localhost，导致网易云拒绝请求
    'content-length', // 会导致服务器死等 Body
    'connection', // 代理不需要控制连接类型
    'origin', // 跨域头，转发会引起安全校验失败
    'referer', // weapi 等加密函数会生成正确的 Referer
    'cookie', //会用 generateCookie 重新生成
    'content-type', // 加密函数会统一设为 x-www-form-urlencoded
    'accept-encoding', // 让 fetch 自动处理
    'request-start-time', // 网易云不认识
    'user-agent' // 加密函数会根据设备类型自动补全
  ]

  Object.keys(rawHeaders).forEach((key) => {
    const lowerKey = key.toLowerCase()
    // 只有不在黑名单里，且有值的头才保留
    if (!forbiddenKeys.includes(lowerKey) && rawHeaders[key] !== undefined) {
      cleanHeaders[key] = String(rawHeaders[key])
    }
  })

  return cleanHeaders
}

/**
 * 将 Cookie 对象序列化为 HTTP Header 字符串
 */
export function serializeCookie(cookie: Cookie): string {
  return Object.entries(cookie)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      // 对 key 和 value 进行编码，模拟原版的 cookieObjToString
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    })
    .join('; ')
}

export function sanitizeCookies(raw: string): string {
  if (!raw) return ''

  // 复杂的正则：匹配以逗号分隔的 Cookie 块，但排除掉 Expires 里的日期逗号
  // 这是一个典型的“非捕获组”技巧
  const cookieBlocks = raw.split(/,(?=[^;]*=)/)

  return cookieBlocks
    .map((block) => {
      return block
        .split(';')
        .map((part) => part.trim())
        .filter((part) => {
          const key = part.split('=')[0].toLowerCase()
          // 敲掉 Domain 和 Path，让它在 localhost 下变成本地可存储的
          return !['domain', 'path', 'secure', 'samesite'].includes(key)
        })
        .join('; ')
    })
    .join(', ') // 依然用逗号连接，交给外层处理
}
