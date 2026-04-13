import { Controller } from '@virid/core'
import { logout, type UserProfile } from '@/utils'
import { Project } from '@virid/vue'
import { UserComponent } from '@/ccs/user'
import { CloseWindowMessage } from '@/ccs'

@Controller()
export class UserDialogController {
  @Project(UserComponent, i => i.userProfile)
  public userProfile: UserProfile | null = null

  login() {
    logout()
    CloseWindowMessage.send()
  }
}
