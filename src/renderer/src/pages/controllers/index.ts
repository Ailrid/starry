import { type ViridApp } from '@virid/core'
import { UserPlaylistPageController } from './user-playlist'
import { PlayerPageController } from './player'
import { HomePageController } from './home'
export function bindPageControllers(app: ViridApp) {
  app.bindController(UserPlaylistPageController)
  app.bindController(PlayerPageController)
  app.bindController(HomePageController)
}

export * from './user-playlist'
export * from './player'
export * from './home'

