import { type ViridApp } from '@virid/core'
import { SliderController } from './slider'
import { PlayerButtonController } from './player-button'
import { SongCardController } from './song-card'
import { PlayerBarController } from './player-bar'
import { LyricController } from './lyric'
import { PlayerConfigController } from './player-config'
import { PlayerInfoController } from './player-info'
export function bindPlayerControllers(app: ViridApp) {
  app.bind(SliderController)
  app.bind(PlayerButtonController)
  app.bind(SongCardController)
  app.bind(PlayerBarController)
  app.bind(LyricController)
  app.bind(PlayerConfigController)
  app.bind(PlayerInfoController)
}
export * from './slider'
export * from './player-button'
export * from './song-card'
export * from './player-bar'
export * from './lyric'
export * from './player-config'
export * from './player-info'
