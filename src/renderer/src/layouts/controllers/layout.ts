import { Controller } from '@virid/core'
import { Responsive, Use, Watch } from '@virid/vue'
import { useRoute } from 'vue-router'
@Controller()
export class LayoutController {
  @Use(() => useRoute())
  public router!: ReturnType<typeof useRoute>
  @Responsive()
  public transitionName: string = 'fly-up'
  @Watch<LayoutController>(i => i.router.name)
  public onRouteChange(toName: string) {
    if (toName === 'player') {
      this.transitionName = 'fly-up'
    } else {
      this.transitionName = 'fly-down'
    }
  }
}
