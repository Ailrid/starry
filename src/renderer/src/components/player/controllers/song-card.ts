import { PlayerComponent, PlaylistComponent } from '@/ccs/playback'
import { SongDetail } from '@/utils/server/interfaces'
import { Controller } from '@virid/core'
import { Project } from '@virid/vue'

@Controller()
export class SongCardController {
  @Project(PlaylistComponent, i => i.currentSong)
  public currentSong: SongDetail | null = null
  @Project(PlayerComponent, i => i.player.isPlaying)
  public isPlaying: boolean = false
}
