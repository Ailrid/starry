import { type ViridApp } from '@virid/core'
import { LoginDialogController } from './login-dialog'
import { QrLoginController } from './qr-login'
import { WindowLoginController } from './window-login'
import { SongCardController } from './user-card'
export function bindLoginControllers(app: ViridApp) {
  app.bindController(LoginDialogController)
  app.bindController(QrLoginController)
  app.bindController(WindowLoginController)
  app.bindController(SongCardController)
}
export * from './login-dialog'
export * from './qr-login'
export * from './window-login'
export * from './user-card'
