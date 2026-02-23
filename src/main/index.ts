import 'reflect-metadata'
import.meta.glob('./systems/**/*.ts', { eager: true })
import { MESSAGE_MAP, InitializationMessage } from '@main/messages'
import { createVirid } from '@virid/core'
import { MainPlugin } from '@virid/main'
import { app } from 'electron'
import { bindComponents } from './components'
const virid = createVirid().use(MainPlugin, { messageMap: MESSAGE_MAP, electronApp: app })
bindComponents(virid)

// 初始化完成，点火
app.whenReady().then(() => {
  InitializationMessage.send()
})
