import { Controller, SingleMessage } from '@virid/core'
import { PlaylistComponent } from '@/ccs/playback'
import { Project, Responsive, Listener } from '@virid/vue'
import { SongDetail } from '@/utils'
import { SettingComponent, type PlayerConfig } from '@/ccs/settings'

export class SwitchViewMessage extends SingleMessage {}

@Controller()
export class PlayerPageController {
  @Project(PlaylistComponent, i => i.currentSong)
  public currentSong: SongDetail | null = null
  @Project(SettingComponent, i => i.player)
  public setting!: PlayerConfig

  @Responsive()
  public currentView: string = 'player-info'

  @Listener({
    messageClass: SwitchViewMessage
  })
  switchView() {
    this.currentView = this.currentView === 'player-info' ? 'player-config' : 'player-info'
  }

  @Project<PlayerPageController>()
  get maskStyle() {
    return {
      backgroundColor: `rgba(0, 0, 0, ${this.setting.opacity})`,
      backdropFilter: `blur(${this.setting.blur}px)`
    }
  }
}
