import { type ViridApp } from '@virid/core'
import { CurrentPlaylistController } from './current-playlist'
import { PlaylistManagerController } from './playlist-manager'
import { MenuAreaController } from './menu-area'
import { SideBarController } from './side-bar'

export function bindSidebarControllers(app: ViridApp) {
  app.bind(CurrentPlaylistController)
  app.bind(PlaylistManagerController)
  app.bind(MenuAreaController)
  app.bind(SideBarController)
}

export * from './current-playlist'
export * from './playlist-manager'
export * from './menu-area'
export * from './side-bar'
