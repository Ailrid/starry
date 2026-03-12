import { System, MessageWriter, Message } from '@virid/core'
import { UserComponent } from './component'
import {
  FetchUserAccountMessage,
  FetchUserPlaylistMessage,
  LogoutMessage,
  FetchUserPlaylistDetailMessage,
  FetchUserPlaylistSongMessage
} from './message'
import { match } from 'ts-pattern'
import {
  userAccount,
  userPlaylist,
  logout,
  playlistDetail,
  songDetail,
  type SongDetail
} from '@/utils/server'
export class UserSystem {
  /**
   * * 获取用户信息
   */
  @System({
    messageClass: FetchUserAccountMessage
  })
  static async fetchUserInfo(userComponent: UserComponent) {
    const profile = await userAccount()
    match(profile)
      .with({ ok: true }, ({ val }) => {
        if (val.profile) {
          userComponent.userProfile = val.profile
          //获取歌单
          FetchUserPlaylistMessage.send()
        } else {
          MessageWriter.error(
            new Error('[User System] Failed To Fetch User Information: Got empty profile')
          )
        }
      })
      .with({ ok: false }, ({ val }) => {
        MessageWriter.error(new Error(val), '[User System] Failed To Fetch User Information')
      })
      .exhaustive()
  }
  /**
   * * 获取用户歌单列表
   */
  @System({
    messageClass: FetchUserPlaylistMessage
  })
  static async fetchUserPlaylist(userComponent: UserComponent) {
    if (!userComponent.userProfile) {
      MessageWriter.warn('[User System] Fetch User Playlist: Not login in')
      return
    }
    const playlist = await userPlaylist({
      uid: userComponent.userProfile.userId,
      limit: 100,
      offset: 0
    })
    match(playlist)
      .with({ ok: true }, ({ val }) => {
        userComponent.userPlaylists = val.playlists
      })
      .with({ ok: false }, ({ val }) => {
        MessageWriter.error(new Error(val), '[User System] Failed To Fetch User Playlist')
      })
      .exhaustive()
  }
  /**
   * * 获取用户歌单详情
   */
  @System()
  static async fetchUserPlaylistDetail(
    @Message(FetchUserPlaylistDetailMessage) message: FetchUserPlaylistDetailMessage,
    userComponent: UserComponent
  ) {
    if (!userComponent.userProfile) {
      MessageWriter.warn('[User System] Fetch User Playlist: Not login in')
      return
    }
    if (userComponent.userPlaylistsDetail.has(message.playlistId)) return
    const detail = await playlistDetail({
      id: message.playlistId
    })
    match(detail)
      .with({ ok: true }, ({ val }) => {
        userComponent.userPlaylistsDetail.set(message.playlistId, val.playlist)
        //自动去拿第0页
        FetchUserPlaylistSongMessage.send(message.playlistId, 0)
      })
      .with({ ok: false }, ({ val }) => {
        MessageWriter.error(
          new Error(val),
          `[User System] Failed To Fetch User Playlist Detail: Id ${message.playlistId}`
        )
      })
      .exhaustive()
  }
  /**
   * * 获取用户歌单里的歌
   */
  @System()
  static async fetchUserPlaylistSong(
    @Message(FetchUserPlaylistSongMessage) message: FetchUserPlaylistSongMessage,
    userComponent: UserComponent
  ) {
    if (!userComponent.userProfile) {
      MessageWriter.warn('[User System] Fetch User Playlist Song: Not login in')
      return
    }
    if (!userComponent.userPlaylistsDetail.has(message.playlistId)) {
      //如果没有detail，先去拿detail
      return new FetchUserPlaylistDetailMessage(message.playlistId)
    }
    const songsIds = userComponent.userPlaylistsDetail.get(message.playlistId)!.songsIds
    //如果已经有数据了，什么也不做
    if (userComponent.userPlaylistsSongs.get(message.playlistId)?.has(message.pageIndex)) return
    //计算这一页的开始索引和结束索引
    const startIndex = message.pageIndex * 200
    const endIndex = startIndex + 200 > songsIds.length ? songsIds.length : startIndex + 200
    const playlist = await songDetail({
      ids: songsIds.slice(startIndex, endIndex)
    })
    match(playlist)
      .with({ ok: true }, ({ val }) => {
        let playlistPages = userComponent.userPlaylistsSongs.get(message.playlistId)
        if (!playlistPages) {
          playlistPages = new Map<number, SongDetail[]>()
          userComponent.userPlaylistsSongs.set(message.playlistId, playlistPages)
        }
        playlistPages.set(message.pageIndex, val.songs)
      })
      .with({ ok: false }, ({ val }) => {
        MessageWriter.error(
          new Error(val),
          `[User System] Failed To Fetch User Playlist Song: Page index: ${message.pageIndex}`
        )
      })
      .exhaustive()
    return
  }

  /**
   * * 登出
   */
  @System({
    messageClass: LogoutMessage
  })
  static async logoutNetease(userComponent: UserComponent) {
    logout()
    userComponent.userPlaylists = []
    userComponent.userProfile = null
  }
}
