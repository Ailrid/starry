import { Controller } from '@virid/core'
import { Project, Responsive } from '@virid/vue'
import { ToMainMessage } from '@virid/renderer'
export class NeteaseWindowMessage extends ToMainMessage {
  __virid_messageType: string = 'open-netease-window'
  __virid_target: string = 'main'
}

@Controller()
export class LoginDialogController {

  @Responsive()
  public currentLoginMode: string = 'qr'
  @Project()
  public get switchText() {
    return this.currentLoginMode === 'qr' ? '切换网页登陆' : '切换二维码登录'
  }
}
