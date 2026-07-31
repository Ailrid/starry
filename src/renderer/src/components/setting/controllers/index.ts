import { type ViridApp } from '@virid/core'
import { ThemeController } from './theme'
import { PipelineController } from './pipeline'
export function bindSettingThemeControllers(app: ViridApp) {
  app.bind(ThemeController)
  app.bind(PipelineController)
}
export * from './theme'
export * from './pipeline'
