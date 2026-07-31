import { Controller } from '@virid/core'
import { Project, Responsive } from '@virid/vue'
//一个局部变量，让player页面且回来的时候，sidebar能找到上次的正确的选项
let currentViewBackup = 'menu-area'

type NameType = 'menu-area' | 'current-playlist' | 'playlist-manager'

@Controller()
export class TitleBarLeftController {
  public nameMap = {
    'menu-area': '功能菜单',
    'current-playlist': '播放列表',
    'playlist-manager': '歌单列表'
  }
  public nameList = ['menu-area', 'current-playlist', 'playlist-manager']
  @Responsive()
  public currentView: string = currentViewBackup
  public changeView(name: NameType) {
    this.currentView = name
    currentViewBackup = name
  }
  @Project<TitleBarLeftController>()
  get currentViewName() {
    return this.nameMap[this.currentView]
  }
  public onWheel(event: WheelEvent) {
    const { deltaY } = event
    let newName = ''
    if (deltaY > 0) {
      newName = this.nameList[(this.nameList.indexOf(this.currentView) + 1) % this.nameList.length]
    } else {
      newName =
        this.nameList[
          (this.nameList.indexOf(this.currentView) - 1 + this.nameList.length) %
            this.nameList.length
        ]
    }
    this.changeView(newName as NameType)
  }
}
