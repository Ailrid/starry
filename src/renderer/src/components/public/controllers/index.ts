import { type ViridApp } from '@virid/core'
import { VirtualListController } from './virtual-list'
import { ScrubberController } from './scrubber'
import { ShareDialogController } from './share-dialog'

export function bindPublicControllers(app: ViridApp) {
  app.bindController(VirtualListController)
  app.bindController(ScrubberController)
  app.bindController(ShareDialogController)
}
export * from './virtual-list'
export * from './scrubber'
export * from './share-dialog'
