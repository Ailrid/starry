import { Controller, SingleMessage } from '@virid/core'
import { type Player, PlayerComponent, SeekTimeMessage } from '@/ccs/playback'
import { Listener, Project, Use } from '@virid/vue'
import { useTemplateRef, type ShallowRef } from 'vue'
export class SliderControllerMessage extends SingleMessage {
  constructor(public event: MouseEvent) {
    super()
  }
}
@Controller()
export class SliderController {
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
  //当前歌曲的滑动条
  /**
   * * 监听滑动条事件并计算seek的时间位置
   */
  @Listener(SliderControllerMessage)
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

/**
 * 将秒数转换为 00:00 或 00:00:00 格式
 * @param seconds 秒数
 */
export const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return '00:00'

  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  // 补零逻辑：padStart(2, '0') 是最优雅的现代 JS 写法
  const mm = m.toString().padStart(2, '0')
  const ss = s.toString().padStart(2, '0')

  // 如果超过一小时，显示 HH:mm:ss；否则显示 mm:ss
  return h > 0 ? `${h.toString().padStart(2, '0')}:${mm}:${ss}` : `${mm}:${ss}`
}
