import { createVirid } from '@virid/core'
import { VuePlugin } from '@virid/vue'
import { RenderPlugin } from '@virid/renderer'
import { bindLoginControllers } from '../components/controllers'
const app = createVirid()
// @ts-ignore
app.use(VuePlugin, {})
app.use(RenderPlugin, {
  windowId: 'login'
})

export function bootstrapVirid() {
  //绑定component
  bindLoginControllers(app)
}
