import { Controller } from '@virid/core'
import { Responsive, Use, Watch } from '@virid/vue'
import { useRoute, useRouter } from 'vue-router'



@Controller()
export class LayoutController {
  @Use(() => useRoute())
  public route!: ReturnType<typeof useRoute>

  @Use(() => useRouter())
  public router!: ReturnType<typeof useRouter>

  @Responsive()
  public transitionName: string = ''
  @Watch<LayoutController>(i => i.route.name)
  public onRouteChange(toName: string, fromName: string) {
    if (toName == 'player') {
      this.transitionName = 'fly-up'
    } else if (fromName == 'player') {
      this.transitionName = 'fly-down'
    }
  }
 
}
