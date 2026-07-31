import { createVirid } from '@virid/core'
import { VuePlugin } from '@virid/vue'
import { RendererPlugin } from '@virid/renderer'
import { bindLoginControllers } from '../components/controllers'
const app = createVirid()
const vuePlugin = new VuePlugin()
const renderPlugin = new RendererPlugin()

app.use(vuePlugin, {})
app.use(renderPlugin, {
  windowId: 'login'
})
export function bootstrapVirid() {
  bindLoginControllers(app)
  return app
}
