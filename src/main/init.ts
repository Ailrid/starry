import { app } from 'electron'
import { join } from 'path'
import { BootStrapElectronMessage, RegisterProtocolMessage } from './electron'
import { InitDatabaseMessage } from '@main/database'
import { InitServerMessage } from '@main/server'
import { executeGroup, nextTick } from '@virid/std'
import { EventMessage, MessageWriter, System, ViridApp } from '@virid/core'

export class InitVireoMessage extends EventMessage {
  constructor(public port: number) {
    super()
  }
}

export class InitVireoSystem {
  @System()
  static async initVireo(message: InitVireoMessage) {
    const userDataPath = app.getPath('userData')
    const dbPath = join(userDataPath, 'music.db')
    const cacheFilesPath = join(userDataPath, 'cache_files')
    // 触发初始化流程，连续执行四条消息
    const res = await executeGroup([
      new InitDatabaseMessage(dbPath, cacheFilesPath),
      new InitServerMessage(message.port),
      new RegisterProtocolMessage(),
      new BootStrapElectronMessage(message.port)
    ])
    if (res) {
      MessageWriter.info(
        '[InitVireoSystem] App Initialization Successful: All initialization work has been completed.'
      )
    } else {
      MessageWriter.error(
        new Error(
          `[InitVireoSystem] App Initialization Failed: Due to an error during the process, initialization has stopped and the app has exited`
        )
      )
      nextTick(() => {
        app.quit()
      })
    }
  }
}

export function registerInitSystems(app: ViridApp) {
  app.register(InitVireoSystem.initVireo)
}
