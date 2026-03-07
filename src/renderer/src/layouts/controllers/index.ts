import { type ViridApp } from '@virid/core'
import { LayoutController } from './layout'
export function bindLayoutControllers(app: ViridApp) {
  app.bindController(LayoutController)
}

export * from './layout'
