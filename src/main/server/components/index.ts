import { DatabaseComponent } from './db'
import { type ViridApp } from '@virid/core'
export * from './db'
export function bindComponents(app: ViridApp) {
  app.bindComponent(DatabaseComponent)
}
