import { PlaylistComponent } from '@/ccs/playback'
import { SongDetail } from '@/utils/server'
import { Controller, SingleMessage } from '@virid/core'
import { Listener, Project, Use } from '@virid/vue'
import { useTemplateRef, type ShallowRef } from 'vue'
import { useRouter } from 'vue-router'
export class PlayerControllerMessage extends SingleMessage {
  constructor(
    public event: MouseEvent,
    public mark: boolean
  ) {
    super()
  }
}
@Controller()
export class PlayerController {
  @Use(() => useRouter())
  public router!: ReturnType<typeof useRouter>

  @Use(() => useTemplateRef('player'))
  public container!: ShallowRef<HTMLElement | null>
  @Project(PlaylistComponent, i => i.currentSong)
  public currentSong!: SongDetail | null
  @Listener(PlayerControllerMessage)
  public onPlayerController(message: PlayerControllerMessage) {
    if (!this.currentSong) return
    if (message.mark || message.event.target === this.container.value)
      this.router.push({ name: 'player' })
  }
}
