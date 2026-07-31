import { type ViridApp } from '@virid/core'
import { UserDialogController } from './login-dialog'

export function bindLoginControllers(app: ViridApp) {
  app.bind(UserDialogController)
}
export * from './login-dialog'
