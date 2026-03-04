import { Component } from '@virid/core'
import { Responsive } from '@virid/vue'
import { type LyricDetail } from '../interface'

@Component()
export class LyricComponent {
  @Responsive()
  public lyric: LyricDetail | null = null
  @Responsive(true)
  public currentIndex: number = 0
}
