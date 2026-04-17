import { type ViridApp } from '@virid/core'
import { ThemeController } from './theme'
import { PipelineController } from './pipeline'
export function bindSettingThemeControllers(app: ViridApp) {
  app.bindController(ThemeController)
  app.bindController(PipelineController)
}
export * from './theme'
export * from './pipeline'
