import { MessageWriter } from '@virid/core'
import { Ok, Err, type Result } from 'ts-results'
const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504])

/**
 * 带有重试逻辑的请求封装
 */
export async function request<P, T>(
  url: string,
  params: P,
  maxRetries = 3,
  baseDelay = 1000
): Promise<Result<T, string>> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
        credentials: 'include'
      })

      // 成功拿到数据
      if (response.ok) {
        const data = (await response.json()) as T
        return Ok(data)
      }

      //遇到了 HTTP 错误
      // 如果不是值得重试的错误（比如 401 没登录，403 没权限），直接放弃
      if (!RETRYABLE_STATUS.has(response.status) || attempt === maxRetries) {
        const errorText = await response.text()
        return Err(`[Request] Request Failed: HTTP ${response.status} ${errorText}`)
      }

      // 如果是 429 或 5xx，且还有重试机会，继续往下走触发重试逻辑
    } catch (e: unknown) {
      // 网络层面的硬崩溃
      const message = e instanceof Error ? e.message : String(e)

      // 如果次数用光了，返回 Err
      if (attempt === maxRetries) {
        return Err(`[Request] Network Error: ${message}`)
      }

      // 否则，打印个警告，准备进入下一次循环
      MessageWriter.warn(
        `[Request] Try Again: Request attempt ${attempt + 1} failed: ${message}. Retrying...`
      )
    }

    // 指数退避逻辑
    const delay = baseDelay * Math.pow(2, attempt)
    await new Promise(resolve => setTimeout(resolve, delay))
  }

  return Err('[Request] Completely Failed: Request failed after maximum retries')
}
