import { RecoverPlaybackMessage } from '@main/persistence'
import { Component } from '@virid/core'
import { type BrowserWindow } from 'electron'

@Component()
export class WindowComponent {
  public commandQueue: Map<string, Array<(window: BrowserWindow) => void>> = new Map([
    [
      'mainWindow',
      [
        // 默认第一个动作：恢复上次的歌单
        () => {
          RecoverPlaybackMessage.send()
        }
      ]
    ]
  ])
  public windows: Map<string, BrowserWindow> = new Map()
}
