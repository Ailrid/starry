import { type ViridApp } from '@virid/core'
import { PlaylistPageController } from './playlist'
export function bindPageControllers(app: ViridApp) {
  app.bindController(PlaylistPageController)
}

export * from './playlist'
