import { PlaySongMessage, SetPlaylistMessage } from '@/ccs/playback'
import { FetchUserPlaylistSongMessage, UserComponent } from '@/ccs/user'
import { SongDetail, type PlaylistDetail } from '@/utils'
import { Controller, SingleMessage } from '@virid/core'
import { Project, Responsive, Use, Listener, Watch } from '@virid/vue'
import { useRoute } from 'vue-router'

let _isSidebarOpen = true

export class PageChangeMessage extends SingleMessage {
  constructor(public pageIndex: number) {
    super()
  }
}

@Controller()
export class PlaylistPageController {
  @Responsive()
  public isSidebarOpen: boolean = _isSidebarOpen

  public toggleSidebar() {
    _isSidebarOpen = !_isSidebarOpen
    this.isSidebarOpen = _isSidebarOpen
  }
  // 注入路由
  @Use(() => useRoute())
  public route!: ReturnType<typeof useRoute>
  // 用户全部的歌单信息
  @Project(UserComponent, i => i.userPlaylistsDetail)
  public userPlaylistsDetail!: Map<number, PlaylistDetail>
  // 用户全部的歌单歌曲
  @Project(UserComponent, i => i.userPlaylistsSongs)
  public userPlaylistsSongs!: Map<number, Map<number, SongDetail[]>>
  // 当前的页面
  @Responsive()
  public pageIndex: number = 0
  //当前的歌单id
  @Project()
  get currentPlaylistId(): number | null {
    const id = this.route.params.id
    return id ? Number(id) : null
  }
  //当前歌单信息从userPlaylistsDetail里投影
  @Project()
  get currentPlaylist(): PlaylistDetail | null {
    const id = this.currentPlaylistId
    if (!id) return null
    return this.userPlaylistsDetail.get(id) || null
  }
  //当前歌单里的歌曲从userPlaylistsSongs里投影
  @Project()
  get currentPlaylistSong(): SongDetail[] | null {
    const playlistId = this.currentPlaylistId
    const pageIndex = this.pageIndex
    return playlistId && this.userPlaylistsSongs.get(playlistId)?.get(pageIndex)
      ? this.userPlaylistsSongs.get(playlistId)!.get(pageIndex)!
      : null
  }
  @Project()
  get maxPageLength() {
    const count = this.currentPlaylist?.songCount || 0
    return Math.ceil(count / 200) || 1
  }
  //每次page变化，去获取新的songs
  @Watch<PlaylistPageController>(i => [i.pageIndex, i.currentPlaylistId], {
    immediate: true
  })
  public updatePlaylist() {
    const playlist = this.currentPlaylistId
    if (!playlist) return
    FetchUserPlaylistSongMessage.send(playlist, this.pageIndex)
  }
  setPlaylist(song: SongDetail | null) {
    if (!this.currentPlaylistSong || !this.currentPlaylist || !song) return
    const playlistDetail = JSON.parse(JSON.stringify(this.currentPlaylist))
    const playlistSongs = JSON.parse(JSON.stringify(this.currentPlaylistSong))
    //替换歌单并播放第一首
    SetPlaylistMessage.send(playlistSongs, playlistDetail)
    PlaySongMessage.send(song)
  }
  @Listener({
    messageClass: PageChangeMessage
  })
  public onPageChange(message: PageChangeMessage) {
    this.pageIndex = message.pageIndex
  }
}
