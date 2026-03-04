import {
  CryptoMode,
  type RequestOptions,
  type RequestConfig,
  WeapiHeaders,
  type CryptoHeaderMap
} from './interface'
import { generateCookie, filterHeaders, sanitizeCookies } from './util'
import { generateApiConfig } from './api'
import { generateEapiConfig } from './eapi'
import { generateWeapiConfig } from './weapi'
import { eapiResDecrypt } from './crypto'
export * from './interface'
export * from './crypto'
export async function createRequest<T extends CryptoMode>(
  cryptoMode: T,
  options: RequestOptions<T>
) {
  const { url, data } = options
  const rawHeaders = options.headers
  const rawCookie = options.cookies
  const cookies = generateCookie(rawCookie)
  const headers = filterHeaders(rawHeaders as Record<string, string>) as CryptoHeaderMap[T]

  let requestConfig: RequestConfig
  if (cryptoMode == CryptoMode.weapi)
    requestConfig = generateWeapiConfig(url, data, headers as WeapiHeaders, cookies)
  else if (cryptoMode == CryptoMode.eapi)
    requestConfig = generateEapiConfig(url, data, headers, cookies)
  else if (cryptoMode == CryptoMode.api)
    requestConfig = generateApiConfig(url, data, headers, cookies)
  else throw new Error('[NetEase Cloud Request] Invalid crypto mode')
  // 发送请求
  const response = await fetch(requestConfig.url, {
    method: 'POST',
    headers: requestConfig.headers as any,
    body: requestConfig.body
  })

  // 拿到原始数据，eapi 接口返回的是二进制 buffer
  const buffer = await response.arrayBuffer()
  const uint8Array = new Uint8Array(buffer)

  let neteaseData: any

  // 响应解密
  if (cryptoMode === CryptoMode.eapi && (options as any).e_r !== false) {
    // eapi 结果通常需要 hex 转码后送入解密函数
    const hexData = Buffer.from(uint8Array).toString('hex').toUpperCase()
    neteaseData = eapiResDecrypt(hexData)
  } else {
    // 其他模式直接解析 JSON
    const text = new TextDecoder().decode(uint8Array)
    try {
      neteaseData = JSON.parse(text)
    } catch {
      neteaseData = text
    }
  }

  // 状态码规范化 (洗白网易云的奇葩状态码)
  // 对应原版 [201, 302, 400...] 变 200 的逻辑
  let status = neteaseData?.code ? Number(neteaseData.code) : response.status
  if ([201, 302, 400, 502, 800, 801, 802, 803].includes(status)) {
    status = 200
  }
  const headerRecord: Record<string, string> = {}
  response.headers.forEach((value, key) => {
    headerRecord[key] = value
  })
  return {
    status,
    data: neteaseData,
    cookies: sanitizeCookies(response.headers.get('set-cookie') || ''),
    headers: headerRecord
  } as {
    status: number
    data: any
    cookies: string // 这里你之前打成了 sting，纠正为 string
    headers: Record<string, string>
  }
}
