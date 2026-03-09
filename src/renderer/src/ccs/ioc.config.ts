import { createVirid } from '@virid/core'
import { VuePlugin } from '@virid/vue'
import { RenderPlugin } from '@virid/renderer'
import { bindPlayback, PlaySongMessage } from './playback'
import { bindSetting } from './settings'
import { bindUser } from './user'
import { bindPublicControllers } from '@/components/public/controllers'
import { bindSettingControllers } from '@/components/setting/controllers'
import { bindPlayerControllers } from '@/components/player/controllers'
import { bindLayoutControllers } from '@/layouts/controllers'
import { bindLoginControllers } from '@/components/login/controllers'
import { InitializationMessage } from './init'
const app = createVirid()
app.use(VuePlugin, {})
app.use(RenderPlugin, {
  windowId: 'renderer'
})
/**
 * 所有的 Controller 和 Component 都在这里排队登记
 */
export function bootstrapDI() {
  bindSetting(app)
  bindUser(app)
  bindPlayback(app)
  bindPublicControllers(app)
  bindSettingControllers(app)
  bindPlayerControllers(app)
  bindLayoutControllers(app)
  bindLoginControllers(app)
  // 启动初始化
  InitializationMessage.send()
  // setTimeout(() => {
  //   PlaySongMessage.send({
  //     id: 3318007487,
  //     platformId: '3318007487',
  //     source: 'netease',
  //     name: 'ROCK IN!',
  //     artists: [{ id: 58234922, name: 'Koseki Bijou' }],
  //     album: {
  //       id: 350436328,
  //       name: 'ROCK IN!',
  //       cover: 'http://p2.music.126.net/-xMsdc0MbIZ09x8COxx31g==/109951172283840080.jpg'
  //     },
  //     duration: 217,
  //     isAvailable: true
  //   })
  // }, 1000)
}
