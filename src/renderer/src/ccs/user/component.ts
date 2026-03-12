import {
  type UserProfile,
  type PlaylistInfo,
  type PlaylistDetail,
  SongDetail
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
  // 用户歌单歌曲(一开始为空，只有点开时缓存),第一个是playlist的id号，第二个是page的index
  @Responsive()
  userPlaylistsSongs: Map<number, Map<number, SongDetail[]>> = new Map()
}
