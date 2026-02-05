import { bindController, bindComponent } from '@/ccs/ioc'
import { HomePageConrtoller } from './controllers/homePageController'
import { SongController } from './controllers/songController'
import { PlaylistController } from './controllers/playListController'
import { PlaylistComponent } from './components/testComponent'
import { PlayerComponent } from './components/testComponent'

/**
 * 所有的 Controller 和 Component 都在这里排队登记
 */
export function bootstrapDI() {
  bindController(PlaylistController)
  bindController(SongController)
  bindController(HomePageConrtoller)
  bindComponent(PlaylistComponent)
  bindComponent(PlayerComponent)
}
