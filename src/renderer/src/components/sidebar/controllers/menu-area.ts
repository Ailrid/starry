import { Controller } from '@virid/core'
import { useRouter } from 'vue-router'
import { Project, Use } from '@virid/vue'
import { PlaylistComponent } from '@/ccs/playback'
import { type SongDetail } from '@/utils'
@Controller()
export class MenuAreaController {
  @Use(() => useRouter())
  public router!: ReturnType<typeof useRouter>

  @Project(PlaylistComponent, i => i.currentSong)
  public currentSong!: SongDetail | null

  goHome() {
    this.router.push({ name: 'home' })
  }

  goPlayer() {
    if (!this.currentSong) return
    this.router.push({ name: 'player' })
  }

  goAccount() {
    // TODO
  }
  goDownload() {
    // TODO
  }
  goDeskLyric() {
    // TODO
  }
}
