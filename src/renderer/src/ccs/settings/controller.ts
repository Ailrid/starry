import { Controller } from '@virid/core'
import { SettingComponent } from './component'
import { Project } from '@virid/vue'
// 辅助函数：将 [r, g, b] 转换为 "rgb(r, g, b)"
const toRgba = (arr: number[], a = 1) => `rgba(${arr[0]}, ${arr[1]}, ${arr[2]},${a})`

@Controller()
export class SettingController {
  @Project(SettingComponent, i => {
    return i
  })
  public setting!: SettingComponent

  /**
   * *计算根部样式
   */
  @Project<SettingController>()
  get rootStyle() {
    const config = this.setting.theme
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
      styles['--border'] = toRgba(config.imgAccentColor!,0.2)
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
  @Project<SettingController>()
  get maskStyle() {
    return {
      backgroundColor: `rgba(0, 0, 0, ${this.setting.theme.opacity})`,
      backdropFilter: `blur(${this.setting.theme.blur}px)`,
      webkitBackdropFilter: `blur(${this.setting.theme.blur}px)` // 为了更好的兼容性
    }
  }
}
