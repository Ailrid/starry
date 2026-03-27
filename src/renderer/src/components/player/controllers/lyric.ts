import { LyricComponent } from '@/ccs/playback'
import { LyricDetail } from '@/utils'
import { Controller } from '@virid/core'
import { OnHook, Project, Responsive, Use, Watch } from '@virid/vue'
import { useTemplateRef, type ShallowRef, nextTick } from 'vue'

@Controller()
export class LyricController {
  @Project(LyricComponent, i => i.lyric)
  public lyric: LyricDetail | null = null

  @Project(LyricComponent, i => i.currentIndex)
  public currentIndex: number = 0
  //每一行歌词的高
  @Responsive()
  public lyricTextHeight: number[] = []
  @Responsive()
  //容器的高度
  public containerHeight: number = 0

  @Use(() => useTemplateRef('container'))
  public containerRef!: ShallowRef<HTMLElement | null>
  @Use(() => useTemplateRef('lyric'))
  public lyricRef!: ShallowRef<HTMLElement | null>

  private observer: ResizeObserver | null = null

  /**
   * * 容器变化时重新获取高度
   */
  @OnHook('onMounted')
  public onMounted() {
    if (this.containerRef.value) {
      // 初始计算高度
      this.containerHeight = this.containerRef.value.clientHeight
      this.lyricTextHeight = Array.from(this.lyricRef.value!.children).map(el => el.clientHeight)
      // 缩放窗口时自动更新
      this.observer = new ResizeObserver(entities => {
        for (const entity of entities) {
          this.containerHeight = entity.contentRect.height
          this.lyricTextHeight = Array.from(this.lyricRef.value!.children).map(
            el => el.clientHeight
          )
        }
      })
      this.observer.observe(this.containerRef.value)
      this.containerRef.value.scrollTo({ top: this.shiftTop })
    }
  }

  /**
   * *卸载时销毁监听
   */
  @OnHook('onUnmounted')
  public cleanup() {
    this.observer?.disconnect()
    this.observer = null
  }

  /**
   * * 歌词变化时重新获取高度
   */
  @Watch(LyricComponent, i => i.lyric)
  public onLyricChange() {
    nextTick(() => {
      if (this.lyricRef.value) {
        this.lyricTextHeight = Array.from(this.lyricRef.value.children).map(
          el => (el as HTMLElement).clientHeight
        )
      }
    })
  }

  /**
   * * 当前歌词离top的距离
   */
  @Project()
  get shiftTop(): number {
    const gap = this.remToPx(2.5) * this.currentIndex
    let textHeight = 0
    for (let i = 0; i < this.currentIndex; i++) textHeight += this.lyricTextHeight[i]
    return textHeight + gap + this.lyricTextHeight[this.currentIndex] / 2
  }

  /**
   * * index改变时自动滚动
   */
  @Watch(LyricComponent, i => i.currentIndex, { immediate: true })
  public onLyricIndexChange() {
    if (this.freezeTime == 0) this.containerRef.value?.scrollTo({ top: this.shiftTop })
  }
  private freezeTime = 0
  private timer: number | null = null

  onWheel() {
    this.freezeTime = 1
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.freezeTime = 0
      // 恢复瞬间立刻同步一次位置
      this.onLyricIndexChange()
      this.timer = null
    }, 3000)
  }

  /**
   * * 把容器上下填充一个padding保证歌词一开始居中
   */
  @Project()
  get paddingStyle() {
    const halfContainerHeight = this.containerHeight / 2
    return {
      paddingTop: `${halfContainerHeight}px`,
      paddingBottom: `${halfContainerHeight}px`
    }
  }
  /**
   * *将 rem 数值转换为当前环境的真实 px
   */
  private remToPx(rem: number): number {
    const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
    return rem * fontSize
  }
}
