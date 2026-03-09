import { UserComponent } from './component'
import { UserController } from './controller'
import { type ViridApp } from '@virid/core'
export * from './component'
export * from './controller'
export * from './system'
export * from './message'
export function bindUser(app: ViridApp) {
  app.bindComponent(UserComponent)
  app.bindController(UserController)
}
