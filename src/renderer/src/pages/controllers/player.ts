import { Controller } from '@virid/core'
import { PlaylistComponent } from '@/ccs/playback'
import { Project } from '@virid/vue'
import { SongDetail } from '@/utils'
import { SettingComponent, type ThemeConfig } from '@/ccs/settings'

@Controller()
export class PlayerPageController {
  @Project(PlaylistComponent, i => i.currentSong)
  public currentSong: SongDetail | null = null
  @Project(SettingComponent, i => i.theme)
  public theme!: ThemeConfig

  @Project<PlayerPageController>()
  get maskStyle() {
    return {
      backgroundColor: `rgba(0, 0, 0, ${this.theme.opacity})`,
      backdropFilter: `blur(12px)`,
      webkitBackdropFilter: `blur(${this.theme.blur}px)`
    }
  }
}
