import { type ViridApp } from '@virid/core'
import { LayoutController } from './layout'
import { TitleBarLeftController } from './title-bar-left'
export function bindLayoutControllers(app: ViridApp) {
  app.bindController(LayoutController)
  app.bindController(TitleBarLeftController)
}

export * from './layout'
export * from './title-bar-left'
