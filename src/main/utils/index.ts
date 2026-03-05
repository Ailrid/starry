import express from 'express'
import cors from 'cors'
import { join } from 'node:path'

const server = express()
server.use(cors({ origin: true, credentials: true })) // 允许跨域
server.use(express.json()) // 解析 JSON body
server.use(express.urlencoded({ extended: true })) // 解析 form body
server.use('/', express.static(join(__dirname, '../renderer')))

export { server }
