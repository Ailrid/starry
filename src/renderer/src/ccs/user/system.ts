import { System, MessageWriter, Message } from '@virid/core'
import { UserComponent } from './component'
import {
  FetchUserAccountMessage,
  FetchUserPlaylistMessage,
  LogoutMessage,
  FetchUserPlaylistDetailMessage,
  FetchUserPlaylistSongMessage,
  AddSongMessage,
  DeleteSongMessage,
  FlashPageDataMessage
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
const PAGE_SIZE = 200

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
    const startIndex = message.pageIndex * PAGE_SIZE
    const endIndex =
      startIndex + PAGE_SIZE > songsIds.length ? songsIds.length : startIndex + PAGE_SIZE
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
   * * 向歌单添加歌曲 (从第一页头部插入)
   */
  @System()
  static async addSong(
    @Message(AddSongMessage) message: AddSongMessage,
    userComponent: UserComponent
  ) {
    const { playlistId } = message
    const playlistMap = userComponent.userPlaylistsSongs.get(playlistId)
    const playlistDetail = userComponent.userPlaylistsDetail.get(playlistId)
    if (!playlistMap || !playlistDetail) return
    //更新歌单专辑总数
    playlistDetail.playCount += 1
    playlistDetail.songsIds = [message.songDetail.id, ...playlistDetail.songsIds]
    // 直接清空缓存
    // 2. 找出所有需要“补位”的页码
    const cachedPageIndexes = Array.from(playlistMap.keys()).sort((a, b) => a - b)
    if (cachedPageIndexes.length === 0) return
    // 计算每一页理论上的“第一首歌”的 ID
    const neededIds = cachedPageIndexes.map(idx => playlistDetail.songsIds[idx * PAGE_SIZE])

    const res = await songDetail({ ids: neededIds })
    //更新每一页的数据
    match(res)
      .with({ ok: true }, ({ val }) => {
        for (const [idx, page] of playlistMap.entries()) {
          playlistMap.set(idx, val.songs)
        }
      })
      .with({ ok: false }, ({ val }) => {
        MessageWriter.error(new Error(val), `[User System]`)
      })
  }

  /**
   * * 从歌单中删除歌曲 (全局寻找并删除)
   */
  @System()
  static async deleteSong(
    @Message(DeleteSongMessage) message: DeleteSongMessage,
    userComponent: UserComponent
  ) {
    const { playlistId, songId } = message
    const playlistMap = userComponent.userPlaylistsSongs.get(playlistId)
    const playlistDetail = userComponent.userPlaylistsDetail.get(playlistId)
    if (!playlistMap || !playlistDetail) return
    //更新歌单专辑总数
    playlistDetail.playCount -= 1
    const index = playlistDetail.songsIds.findIndex(s => s === songId)
    playlistDetail.songsIds.splice(index, 1)
    // 从这直接清除删除之后的页面
    if (playlistMap) {
      const affectedPageIndex = Math.floor(index / PAGE_SIZE)

      // 删掉受影响及其之后的页面缓存
      for (const pageIndex of playlistMap.keys()) {
        if (pageIndex >= affectedPageIndex) {
          playlistMap.delete(pageIndex)
        }
      }
      // 重新获取第一页
      // FetchUserPlaylistSongMessage.send(playlistId, 0)
      // 告诉controller重新获取
      FlashPageDataMessage.send(playlistId)
    }
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
