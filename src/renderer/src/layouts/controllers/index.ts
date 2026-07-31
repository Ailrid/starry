import { type ViridApp } from '@virid/core'
import { LayoutController } from './layout'
import { TitleBarLeftController } from './title-bar-left'
export function bindLayoutControllers(app: ViridApp) {
  app.bind(LayoutController)
  app.bind(TitleBarLeftController)
}

export * from './layout'
export * from './title-bar-left'
