import { type ViridApp } from '@virid/core'
import { CurrentPlaylistController } from './current-playlist'
import { PlaylistManagerController } from './playlist-manager'
import { RecentPlayController } from './recent-play'
import { SideBarController } from './side-bar'

export function bindSidebarControllers(app: ViridApp) {
  app.bindController(CurrentPlaylistController)
  app.bindController(PlaylistManagerController)
  app.bindController(RecentPlayController)
  app.bindController(SideBarController)
}

export * from './current-playlist'
export * from './playlist-manager'
export * from './recent-play'
export * from './side-bar'
