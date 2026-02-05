import { Env, Inherit, OnHook, Project } from '@/ccs/decorators/vue'
import { Controller } from '@/ccs/decorators/ccs'
import { PlaylistController } from './playListController'
import { Song } from '../components/testComponent'
import { SongControllerMessage } from './playListController'
@Controller()
export class SongController {
  @Env()
  public index!: number
  @OnHook('onSetup')
  public onSetup() {
    console.log('我的索引是：', this.index)
  }
  @Inherit(PlaylistController, 'playlist', (i) => i.playlist)
  public playlist!: Song[]

  @Project<SongController>((i) => i.playlist?.[i.index])
  public song!: Song

  playThisSong() {
    //其实直接播放也行，但是这里我们模拟一下需要发送给父组件让父组件处理的情况
    console.log('发送播放消息:', this.index)
    SongControllerMessage.send(this.index)
  }
}
