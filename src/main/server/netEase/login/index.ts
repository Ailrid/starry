import { ExpressPlugin } from '@virid/express'
import {
  LoginQrCheckSystem,
  LoginQrCreateSystem,
  LoginQrKeySystem,
  LoginCellphoneSystem
} from './systems'
import {
  FetchCookiesRequestMessage,
  OpenLoginWindowRequestMessage,
  CloseLoginWindowRequestMessage,
  LoginQrCheckRequestMessage,
  LoginQrCreateRequestMessage,
  LoginQrKeyRequestMessage,
  LogoutRequestMessage
} from './message'
import { ViridApp } from '@virid/core'
export function LoginSystemsBunch(app: ViridApp, plugin: ExpressPlugin) {
  plugin.bindRoute(FetchCookiesRequestMessage)
  plugin.bindRoute(OpenLoginWindowRequestMessage)
  plugin.bindRoute(CloseLoginWindowRequestMessage)
  plugin.bindRoute(LoginQrCheckRequestMessage)
  plugin.bindRoute(LoginQrCreateRequestMessage)
  plugin.bindRoute(LoginQrKeyRequestMessage)
  plugin.bindRoute(LogoutRequestMessage)
  plugin.register(LoginQrCheckSystem.checkQrStatus)
  plugin.register(LoginQrCreateSystem.createQrCode)
  plugin.register(LoginQrKeySystem.getQrKey)
  plugin.register(LoginCellphoneSystem.open)
  plugin.register(LoginCellphoneSystem.close)
  plugin.register(LoginCellphoneSystem.cookies)
  app.register(LoginCellphoneSystem.createWindow)
}
