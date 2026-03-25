import { type ViridApp } from '@virid/core'
import { SliderController } from './slider'
import { PlayerButtonController } from './player-button'
import { SongCardController } from './song-card'
import { PlayerController } from './player'
import { LyricController } from './lyric'
export function bindPlayerControllers(app: ViridApp) {
  app.bindController(SliderController)
  app.bindController(PlayerButtonController)
  app.bindController(SongCardController)
  app.bindController(PlayerController)
  app.bindController(LyricController)
}
export * from './slider'
export * from './player-button'
export * from './song-card'
export * from './player'
export * from './lyric'
