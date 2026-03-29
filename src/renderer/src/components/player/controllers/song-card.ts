import { PlayerComponent, PlaylistComponent } from '@/ccs/playback'
import { SongDetail } from '@/utils/server'
import { Controller } from '@virid/core'
import { Project } from '@virid/vue'
import record from '@assets/imgs/record.png'

@Controller()
export class SongCardController {
  @Project(PlaylistComponent, i => i.currentSong)
  public currentSong: SongDetail | null = null
  @Project(PlayerComponent, i => i.player.isPlaying)
  public isPlaying: boolean = false
  @Project()
  public get cover() {
    return this.currentSong ? this.currentSong?.album.cover + '?param=128y128' : record
  }
}
