import {
  type UserProfile,
  type PlaylistInfo,
  type PlaylistDetail,
} from '@/utils/server'
import { Component } from '@virid/core'
import { Responsive } from '@virid/vue'

@Component()
export class UserComponent {
  //用户信息
  @Responsive()
  userProfile: UserProfile | null = null
  // 用户歌单信息
  @Responsive()
  userPlaylists: PlaylistInfo[] = []
  // 用户歌单详情(一开始为空，只有点开时缓存)
  @Responsive()
  userPlaylistsDetail: Map<number, PlaylistDetail> = new Map()
}
