import { DatabaseComponent } from './component'
import { type ViridApp } from '@virid/core'
export * from './component'
export * from './system'
export * from './message'
export function bindDatabaseComponents(app: ViridApp) {
  app.bindComponent(DatabaseComponent)
}
