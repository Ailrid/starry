import { Controller, SingleMessage } from '@virid/core'
import { Listener, Use } from '@virid/vue'
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
  @Listener(PlayerControllerMessage)
  public onPlayerController(message: PlayerControllerMessage) {
    if (message.mark || message.event.target === this.container.value)
      this.router.push({ name: 'player' })
  }
}
