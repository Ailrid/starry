import { Controller } from '@virid/core'
import { UserComponent } from './component'
import { Project } from '@virid/vue'
import { type UserProfile, type PlaylistInfo, type PlaylistDetail } from '@/utils/server'

@Controller()
export class UserController {
  //用户信息
  @Project(UserComponent, i => i.userProfile)
  userProfile: UserProfile | null = null
  // 用户歌单信息
  @Project(UserComponent, i => i.userPlaylists)
  userPlaylists: PlaylistInfo[] = []
  // 用户歌单详情(一开始为空，只有点开时缓存)
  @Project(UserComponent, i => i.userPlaylistsDetail)
  userPlaylistsDetail: Map<number, PlaylistDetail> = new Map()
}
