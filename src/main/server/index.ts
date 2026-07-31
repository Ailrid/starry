import { cacheSystemsBunch } from './cache'
import { netEaseSystemsBunch } from './netEase'
import { registerExpressSystems } from './express'
import { ViridApp } from '@virid/core'
import { ExpressPlugin } from '@virid/express'
export { InitServerMessage } from './express'
export { Server } from './express'
export function serverSystemsBunch(app: ViridApp, plugin: ExpressPlugin) {
  registerExpressSystems(app)
  netEaseSystemsBunch(app, plugin)
  cacheSystemsBunch(app, plugin)
}
