import { type ViridApp } from '@virid/core'
import { VirtualListController } from './virtual-list'
import { ScrubberController } from './scrubber'
import { ShareDialogController } from './share-dialog'

export function bindPublicControllers(app: ViridApp) {
  app.bind(VirtualListController)
  app.bind(ScrubberController)
  app.bind(ShareDialogController)
}
export * from './virtual-list'
export * from './scrubber'
export * from './share-dialog'
