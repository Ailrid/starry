import { PlaylistComponent } from '@/ccs/playback'
import { SongDetail } from '@/utils/server'
import { Controller } from '@virid/core'
import { Project } from '@virid/vue'
@Controller()
export class CurrentPlaylistController {
  @Project(PlaylistComponent, i => i.currentSong)
  public currentSong: SongDetail | null = null

  @Project(PlaylistComponent, i => i.currentList)
  public currentList: SongDetail[] = []
    

}
