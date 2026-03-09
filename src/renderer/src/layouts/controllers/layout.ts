import { Controller } from '@virid/core'
import { Responsive, Use, Watch } from '@virid/vue'
import { useRoute } from 'vue-router'
@Controller()
export class LayoutController {
  @Use(() => useRoute())
  public router!: ReturnType<typeof useRoute>
  @Responsive()
  public transitionName: string = ''
  @Watch<LayoutController>(i => i.router.name)
  public onRouteChange(toName: string, fromName: string) {
    if (fromName === 'home' && toName === 'player') {
      this.transitionName = 'fly-up'
    } else if (fromName === 'player' && toName === 'home') {
      this.transitionName = 'fly-down'
    }
  }
}
