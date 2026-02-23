import { SingleMessage, System, Message } from '@virid/core'
import { PlayerComponent, LyricComponent } from '../player'
export class InitializationMessage extends SingleMessage {}

export class InitSystem {
  @System(1000)
  static initSetting(@Message(InitializationMessage) _message: InitializationMessage) {
    //TODO
  }
  @System(999)
  static initPlayer(
    @Message(InitializationMessage) _message: InitializationMessage,
    playerComponent: PlayerComponent,
    lyricComponent: LyricComponent
  ) {
    // 绑定回调,在时间更新时自动更新歌词
    playerComponent.player.addListener('timeupdate', () => {
      const time = playerComponent.player.currentTime
      const lines = lyricComponent.lyric // 这里假设你之前存入的是数组

      if (!lines || lines.data.length === 0) return

      // 寻找当前时间对应的索引
      let low = 0
      let high = lines.data.length - 1
      let index = -1

      while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        if (lines.data[mid].time <= time) {
          index = mid
          low = mid + 1
        } else {
          high = mid - 1
        }
      }
      if (index !== -1 && index !== lyricComponent.currentIndex) {
        lyricComponent.currentIndex = index
      }
    })
  }
}
