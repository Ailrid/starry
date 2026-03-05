export * from './virtual-list'
import { type ViridApp } from '@virid/core'
import { VirtualListController } from './virtual-list'
export function bindPublicControllers(app: ViridApp) {
  app.bindController(VirtualListController)
}
