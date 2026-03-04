import { createCipheriv, createHash, createDecipheriv, publicEncrypt, constants } from 'node:crypto'

import { NETEASE_CRYPT } from './constant'
/**
 * AES 加密器
 */
export function aesEncrypt(
  text: string,
  mode: 'cbc' | 'ecb',
  key: string,
  iv: string,
  format: 'base64' | 'hex' = 'base64'
): string {
  // 映射算法名称
  const algorithm = `aes-128-${mode.toLowerCase()}`

  // 准备 Key 和 IV
  const keyBuffer = Buffer.from(key)
  const ivBuffer = mode.toLowerCase() === 'ecb' ? Buffer.alloc(0) : Buffer.from(iv)

  // 创建加密实例
  const cipher = createCipheriv(algorithm, keyBuffer, ivBuffer)

  // 执行加密并拼接 Buffer
  let encrypted = cipher.update(text, 'utf8')
  encrypted = Buffer.concat([encrypted, cipher.final()])

  // 根据格式返回
  if (format === 'hex') {
    return encrypted.toString('hex').toUpperCase()
  }
  return encrypted.toString('base64')
}
/**
 * AES 解密器
 */
export function aesDecrypt(
  ciphertext: string,
  mode: 'cbc' | 'ecb',
  key: string,
  iv: string,
  format: 'base64' | 'hex' = 'base64'
): string {
  // 核心参数准备
  const algorithm = `aes-128-${mode.toLowerCase()}`
  const keyBuffer = Buffer.from(key)
  const ivBuffer = mode.toLowerCase() === 'ecb' ? Buffer.alloc(0) : Buffer.from(iv)

  // 初始化解密实例
  const decipher = createDecipheriv(algorithm, keyBuffer, ivBuffer)

  // 执行解密
  let decrypted = decipher.update(ciphertext, format, 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}

/**
 * RSA 加密
 */
export function rsaEncrypt(str: string, key: string): string {
  const modulusLength = 128
  const inputBuffer = Buffer.from(str, 'utf8')

  // 手动进行前置补零 (Padding)，使长度恰好等于 128 字节
  const paddingBuffer = Buffer.alloc(modulusLength - inputBuffer.length, 0)
  const finalBuffer = Buffer.concat([paddingBuffer, inputBuffer])

  // 用 RSA_NO_PADDING 模式加密
  const encrypted = publicEncrypt(
    {
      key,
      padding: constants.RSA_NO_PADDING
    },
    finalBuffer
  )

  // 返回 hex 格式，并确保补齐 256 位十六进制字符
  return encrypted.toString('hex').padStart(256, '0')
}

/**
 * WEAPI
 */
export function weapi(object: object) {
  const text = JSON.stringify(object)
  const { base62, presetKey, iv, publicKey } = NETEASE_CRYPT

  // 生成 16 位随机密钥
  const secretKey = Array.from({ length: 16 }, () =>
    base62.charAt(Math.floor(Math.random() * 62))
  ).join('')
  // 2次 AES CBC 加密
  // 第一次用固定的 presetKey
  const firstEncrypt = aesEncrypt(text, 'cbc', presetKey, iv, 'base64')
  // 第二次用刚生成的随机 secretKey
  const params = aesEncrypt(firstEncrypt, 'cbc', secretKey, iv, 'base64')

  // 将随机 Key 反转并 RSA 加密
  const encSecKey = rsaEncrypt(secretKey.split('').reverse().join(''), publicKey)

  return { params, encSecKey }
}

/**
 * MD5 摘要算法
 */
export function md5(text: string): string {
  return createHash('md5').update(text).digest('hex')
}

/**
 * EAPI 方案：用于移动端接口加密
 */
export function eapi(url: string, object: any) {
  const text = typeof object === 'object' ? JSON.stringify(object) : object
  const message = `nobody${url}use${text}md5forencrypt`
  const digest = md5(message)
  const data = `${url}-36cd479b6b5-${text}-36cd479b6b5-${digest}`

  return {
    params: aesEncrypt(data, 'ecb', NETEASE_CRYPT.eapiKey, '', 'hex')
  }
}

/**
 * EAPI 响应解密
 */
export function eapiResDecrypt(encryptedParams: string) {
  // 之前重构的 aesDecrypt 已经支持传入 'hex' 格式
  const decryptedData = aesDecrypt(encryptedParams, 'ecb', NETEASE_CRYPT.eapiKey, '', 'hex')
  return JSON.parse(decryptedData)
}

/**
 * EAPI 请求解密
 */
export function eapiReqDecrypt(encryptedParams: string) {
  const decryptedData = aesDecrypt(encryptedParams, 'ecb', NETEASE_CRYPT.eapiKey, '', 'hex')

  // 使用正则拆解拼接后的字符串
  const match = decryptedData.match(/(.*?)-36cd479b6b5-(.*?)-36cd479b6b5-(.*)/)
  if (match) {
    return {
      url: match[1],
      data: JSON.parse(match[2]),
      digest: match[3]
    }
  }
  return null
}
