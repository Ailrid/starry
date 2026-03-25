import { Controller } from '@virid/core'
import { Project, Use } from '@virid/vue'
import { type SongDetail, type PlaylistInfo } from '@/utils'
import { PlayerComponent, PlaylistComponent } from '@/ccs/playback'

import { UserComponent } from '@/ccs/user'
import { useTemplateRef } from 'vue'
@Controller()
export class PlayerButtonController {
  //当前正在播放的歌曲
  @Project(PlaylistComponent, i => i.currentSong)
  public currentSong: SongDetail | null = null
  //用户当前喜欢歌曲的列表
  @Project(UserComponent, i => i.userPlaylists)
  public userPlaylists: PlaylistInfo[] = []
  //当前的音量
  @Project(PlayerComponent, i => i.player.volume)
  public volume: number = 0
  @Use(() => useTemplateRef('volumeBar'))
  public volumeBar!: ReturnType<typeof useTemplateRef>
  onVolumeMouseDown(_e: MouseEvent) {
    //TODO
  }
}
