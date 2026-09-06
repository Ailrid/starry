import { type ViridApp } from '@virid/core'
import { LayoutController } from './layout'
import { TitleBarLeftController } from './title-bar-left'
import { TitleBarRightController } from './title-bar-right'
export function bindLayoutControllers(app: ViridApp) {
  app.bind(LayoutController)
  app.bind(TitleBarLeftController)
  app.bind(TitleBarRightController)
}

export * from './layout'
export * from './title-bar-left'
export * from './title-bar-right'
