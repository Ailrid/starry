import { bindDatabaseComponents } from './component'
import { type ViridApp } from '@virid/core'
import { registerDbSystems } from './system'
import { bindDatabaseMessages } from './message'
import { MainPlugin } from '@virid/main'
export * from './component'
export * from './message'

export function databaseComponentsBunch(app: ViridApp, plugin: MainPlugin) {
  registerDbSystems(app)
  bindDatabaseComponents(app)
  bindDatabaseMessages(plugin)
}
