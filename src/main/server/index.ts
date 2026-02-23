import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import neteaseRouter from './netEase'
import { cacheRouter } from './cache'
import { join } from 'path'
export * from './db'
import { type ErrorRequestHandler } from 'express'
const server = express()

server.use(cors({ origin: true, credentials: true })) // 允许跨域
server.use(cookieParser()) // 解析 Cookie
server.use(express.json()) // 解析 JSON body
server.use(express.urlencoded({ extended: true })) // 解析 form body

// server.use(express.static("public"));

//挂载网易云音乐路由
server.use('/api', neteaseRouter)
server.use('/api', cacheRouter)
//挂载本地页面路由
server.use('/', express.static(join(__dirname, '../renderer')))

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(500).json({ error: err.message })
}

server.use(errorHandler)
export { server }
