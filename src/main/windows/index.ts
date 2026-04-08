import { WindowComponent } from './component'
import { type ViridApp } from '@virid/core'
export * from './component'
export * from './window-system'
export * from './tray-system'
export * from './share-system'
export * from './message'
export function bindWindowComponents(app: ViridApp) {
  app.bindComponent(WindowComponent)
}