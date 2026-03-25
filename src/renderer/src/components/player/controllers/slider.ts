import { Controller, SingleMessage } from '@virid/core'
import { type Player, PlayerComponent, SeekTimeMessage } from '@/ccs/playback'
import { Listener, Project, Use } from '@virid/vue'
import { useTemplateRef, type ShallowRef } from 'vue'
import { formatTime } from '@/utils'
import { SettingComponent, type ThemeConfig } from '@/ccs/settings'
export class SliderControllerMessage extends SingleMessage {
  constructor(public event: MouseEvent) {
    super()
  }
}
@Controller()
export class SliderController {
  @Project(SettingComponent, i => i.theme)
  public theme!: ThemeConfig
  //播放器
  @Project(PlayerComponent, i => i.player)
  public player!: Player
  //当前歌曲的滑动条
  @Project(PlayerComponent, i => i.player.slider)
  public slider!: Array<number>
  //当前歌曲的滑动条
  @Project(PlayerComponent, i => i.player.sliderMask)
  public sliderMask!: Array<boolean>
  //当前歌曲的滑动条

  @Use(() => useTemplateRef<HTMLElement>('sliderContainer'))
  public container!: ShallowRef<HTMLElement>
  @Project()
  get currentTime() {
    return formatTime(this.player.currentTime)
  }

  waveBarStyle(active: boolean) {
    if (!this.theme.enableSliderAutoColor) {
      return active
        ? 'bg-primary scale-y-100 opacity-90 shadow-[0_0_15px_rgba(var(--primary),0.6)]'
        : 'bg-primary scale-y-75 opacity-50'
    }
    return active
      ? 'bg-cover-color scale-y-100 opacity-90 shadow-[0_0_15px_rgba(var(--cover-color),0.6)]'
      : 'bg-cover-color scale-y-75 opacity-50'
  }
  //当前歌曲的滑动条
  /**
   * * 监听滑动条事件并计算seek的时间位置
   */
  @Listener({
    messageClass: SliderControllerMessage
  })
  public onSliderChange(message: SliderControllerMessage) {
    if (!this.container.value || !this.player.duration) return

    const rect = this.container.value.getBoundingClientRect()
    const clickX = message.event.clientX - rect.left
    const width = rect.width

    // 计算百分比并限制在 0-1 之间
    const percentage = Math.max(0, Math.min(1, clickX / width))
    const seekTime = percentage * this.player.duration
    SeekTimeMessage.send(seekTime)
  }
}
