import 'reflect-metadata'
import { createVirid } from '@virid/core'
import { MainPlugin } from '@virid/main'
import { ExpressPlugin } from '@virid/express'
import { StdPlugin } from '@virid/std'
import { app } from 'electron'
import { InitVireoMessage, registerInitSystems } from './init'
import { electronSystemsBunch } from './electron'
import { databaseComponentsBunch } from './database'
import { serverSystemsBunch, Server } from './server'
import { windowSystemsBunch } from './windows'

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  const server = new Server()
  const stdPlugin = new StdPlugin()
  const mainPlugin = new MainPlugin()
  const expressPlugin = new ExpressPlugin()

  const virid = createVirid().use(stdPlugin, null).use(mainPlugin, { electronApp: app })

  virid.spawn(server)

  registerInitSystems(virid)
  serverSystemsBunch(virid, expressPlugin)
  electronSystemsBunch(virid, mainPlugin)
  databaseComponentsBunch(virid, mainPlugin)
  windowSystemsBunch(virid, mainPlugin)
  virid.use(expressPlugin, { server: server.server })
  //初始化整个App
  InitVireoMessage.send(1566)
}
