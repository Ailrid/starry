import { Controller } from '@virid/core'
import { SettingComponent, type ThemeConfig } from './component'
import { Project, Responsive, Watch } from '@virid/vue'
import { PlaylistComponent } from '../playback'
import { type SongDetail, getAccentRGB } from '@/utils'
import { SaveSettingsMessage } from './message'
// 辅助函数：将 [r, g, b] 转换为 "rgb(r, g, b)"
const toRgba = (arr: number[], a = 1) => `rgba(${arr[0]}, ${arr[1]}, ${arr[2]},${a})`
let _coverColor: number[] = []

@Controller()
export class SettingThemeController {
  @Project(SettingComponent, i => i.theme)
  public theme!: ThemeConfig
  @Responsive()
  public coverColor: number[] = _coverColor
  /**
   * *计算根部样式
   */
  @Project<SettingThemeController>()
  get rootStyle() {
    const config = this.theme
    const styles: Record<string, string | number> = {}

    // 字体与圆角
    document.documentElement.style.fontSize = `${config.fontSizeScale * 16}px`
    styles['--radius'] = `${config.borderRadius}px`
    styles['font-family'] = config.fontFamily

    // 颜色变量映射
    if (config.textColor && config.mode == 'image') {
      styles['--foreground'] =
        config.textColor == 'black' ? 'oklch(0.145 0 0)' : 'oklch(0.92 0.01 0)'
    }
    if (Array.isArray(config.primaryColor)) {
      styles['--primary'] = toRgba(config.primaryColor)
    }
    if (Array.isArray(config.imgAccentColor) && Array.isArray(config.imgAvgColor)) {
      styles['--img-accent-color'] = toRgba(config.imgAccentColor)
      styles['--img-avg-color'] = toRgba(config.imgAvgColor)
    }
    if (this.coverColor.length > 0) {
      styles['--cover-color'] = toRgba(this.coverColor)
    }
    //文字和边框颜色
    if (config.mode === 'dark') {
      document.documentElement.classList.add('dark')
      styles['--border'] = 'rgba(255, 255, 255, 0.1)'
      styles['boxShadow'] = 'inset 0 0 4px rgba(0, 0, 0, 0.5)'
    } else if (config.mode === 'light') {
      document.documentElement.classList.remove('dark')
      styles['--border'] = 'oklch(0.145 0 0 / 0.2)'
    } else if (config.mode === 'image') {
      //图像模式更改颜色
      document.documentElement.classList.remove('dark')
      styles['--foreground'] = config.textColor || 'var(--foreground)'
      styles['--border'] = toRgba(config.imgAccentColor!, 0.2)
      //清除本来的背景色
      styles['--background'] = 'transparent'
      styles['--card'] = toRgba(config.imgAvgColor!, 0.1)
      styles['--sidebar'] = toRgba(config.imgAvgColor!, 0.1)
      styles['--bg-image'] = `url("${config.url}")`
    }

    return styles
  }

  /**
   * *控制遮罩的opacity和blur
   */
  @Project<SettingThemeController>()
  get maskStyle() {
    return {
      backgroundColor: `rgba(0, 0, 0, ${this.theme.opacity})`,
      backdropFilter: `blur(${this.theme.blur}px)`
    }
  }
  @Watch(PlaylistComponent, i => i.currentSong)
  public async onCurrentSongChange(song: SongDetail | null) {
    if (song) {
      const cover = song.album.cover
      const { avgColor, accentColor } = await getAccentRGB(cover)
      _coverColor = avgColor
      this.coverColor = avgColor
      if (this.theme.immersiveMode) {
        SaveSettingsMessage.send(settings => {
          settings.theme.url = song.album.cover
          settings.theme.imgAccentColor = accentColor
          settings.theme.imgAvgColor = avgColor
          settings.theme.primaryColor = accentColor
        })
      }
    }
  }
}
