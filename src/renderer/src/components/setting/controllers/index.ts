import { type ViridApp } from '@virid/core'
import { ThemeController } from './theme'
export function bindSettingThemeControllers(app: ViridApp) {
  app.bindController(ThemeController)
}
export * from './theme'
