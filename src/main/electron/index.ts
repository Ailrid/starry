import { bindElectronComponents } from './component'
import { registerElectronSystems } from './system'
import { bindElectronMessages } from './message'
import { type ViridApp } from '@virid/core'
import { MainPlugin } from '@virid/main'
export * from './message'
export * from './component'
export function electronSystemsBunch(app: ViridApp, plugin: MainPlugin) {
  registerElectronSystems(app)
  bindElectronComponents(app)
  bindElectronMessages(plugin)
}
