import { Controller } from '@virid/core'
import { Responsive, Watch } from '@virid/vue'
import { getAccentRGB, type UserProfile } from '@/utils'
import { UserComponent } from '@/ccs/user'

@Controller()
export class SongCardController {
  @Responsive()
  public avatarColor: string | null = null
  @Watch(UserComponent, i => i.userProfile, { immediate: true })
  public async onUserLogin(newVal: UserProfile | null) {
    if (!newVal) return
    const { accentColor } = await getAccentRGB(newVal.avatar)
    console.log('newVal.avatar :>> ', newVal.avatar)
    this.avatarColor = `rgb(${accentColor[0]},${accentColor[1]},${accentColor[2]})`
    console.log('this.avatarColor  :>> ', this.avatarColor)
  }
}
