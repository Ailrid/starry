import { createVirid } from '@virid/core'
import { VuePlugin } from '@virid/vue'
import { RenderPlugin } from '@virid/renderer'
import { bindPlayer } from './player'
import { InitializationMessage } from './init'
const app = createVirid()
app.use(VuePlugin, {})
app.use(RenderPlugin, {
  windowId: 'renderer',
  messageMap: {}
})
/**
 * 所有的 Controller 和 Component 都在这里排队登记
 */
export function bootstrapDI() {
  bindPlayer(app)
  // 启动初始化
  InitializationMessage.send()
}
