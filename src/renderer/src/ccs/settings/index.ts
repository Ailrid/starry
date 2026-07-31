import { SettingComponent } from './component'
import { SettingThemeController } from './controller'
import { registerSettingSystems } from './system'
import { type ViridApp } from '@virid/core'
export * from './component'
export * from './controller'
export * from './system'
export * from './message'
export function settingBunch(app: ViridApp) {
  app.bind(SettingComponent)
  app.bind(SettingThemeController)
  registerSettingSystems(app)
}
