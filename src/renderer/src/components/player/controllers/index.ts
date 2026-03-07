import { type ViridApp } from '@virid/core'
import { SliderController } from './slider'
import { VolumeController } from './volume'
import { SongCardController } from './song-card'
import { PlayerController } from './player'
export function bindPlayerControllers(app: ViridApp) {
  app.bindController(SliderController)
  app.bindController(VolumeController)
  app.bindController(SongCardController)
  app.bindController(PlayerController)
}
export * from './slider'
export * from './volume'
export * from './song-card'
export * from './player'
