export * from './fromMain'
export * from './toMain'
import { registerFromMainSystems } from './fromMain'
import { registerToMainSystems } from './toMain'
import { type ViridApp } from '@virid/core'
import { type RendererPlugin } from '@virid/renderer'
export function registerElectronSystems(app: ViridApp, plugin: RendererPlugin) {
  registerFromMainSystems(app, plugin)
  registerToMainSystems(app)
}
