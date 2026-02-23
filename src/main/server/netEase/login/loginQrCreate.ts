import { type Request, type Response } from 'express'
import { renderSVG } from 'uqr'
export const apiUrl = '/login/qr/create'

export async function handler(req: Request, res: Response): Promise<any> {
  const query = req.body

  if (!query.unikey)
    throw new Error(
      `[Netease API Error] Request Parameter Missing: Request url is ${apiUrl} Need parameter unikey, request parameter is ${query}`
    )
  if (!query.unikey) throw new Error('Need a unikey')
  const url = `https://music.163.com/login?codekey=${query.unikey}`

  // 使用 uqr 生成结果
  const answer = {
    qrurl: url,
    // 方案 A: 返回 SVG 字符串 (更现代，体积小，无限放大不模糊)
    qrsvg: renderSVG(url)
  }

  return res.status(200).json(answer)
}
