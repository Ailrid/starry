import { Controller } from '@virid/core'
import { type UserProfile } from '@/utils'
import { Project, Responsive } from '@virid/vue'
import { UserComponent } from '@/ccs/user'
import { ToMainMessage } from '@virid/renderer'
export class NeteaseWindowMessage extends ToMainMessage {
  __virid_messageType: string = 'open-netease-window'
  __virid_target: string = 'main'
}

@Controller()
export class LoginDialogController {
  @Project(UserComponent, i => i.userProfile)
  public userProfile: UserProfile | null = null
  @Responsive()
  public currentLoginMode: string = 'qr'
  @Project()
  public get switchText() {
    return this.currentLoginMode === 'qr' ? '切换网页登陆' : '切换二维码登录'
  }
}
