import { type ViridApp } from '@virid/core'
import { UserPlaylistPageController } from './user-playlist'
import { PlayerPageController } from './player'
export function bindPageControllers(app: ViridApp) {
  app.bindController(UserPlaylistPageController)
  app.bindController(PlayerPageController)
}

export * from './user-playlist'
export * from './player'
