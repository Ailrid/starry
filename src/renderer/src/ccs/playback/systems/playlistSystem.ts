import { System, Message, MessageWriter } from '@virid/core'
import {
  PlaySongMessage,
  SetPlaylistMessage,
  LoadFMPlaylistMessage,
  LoadIntelligencePlaylistMessage
} from '../messages'
import { PlaylistComponent } from '../components'
import { personalFm, intelligence } from '@/utils/server'
import { match } from 'ts-pattern'

export class PlaylistSystem {
  /**
   * *加载FM模式歌曲的buffer
   */
  @System({
    messageClass: LoadFMPlaylistMessage
  })
  async loadFmPlaylist(playlistComponent: PlaylistComponent) {
    // 获取 FM 原始数据
    const fmRes = await personalFm({} as any)

    // 处理第一层
    await match(fmRes)
      .with({ ok: true }, async ({ val }) => {
        // 填充
        playlistComponent.fmList.push(...val.songs)
        const nextSong = playlistComponent.fmList.shift()!
        PlaySongMessage.send(nextSong)
      })
      .with({ ok: false }, ({ val: err }) => {
        MessageWriter.error(new Error(err))
      })
      .exhaustive()
  }

  /**
   * *加载心动模式歌曲的buffer
   */
  @System()
  async loadIntelligencePlaylist(
    @Message(LoadIntelligencePlaylistMessage) message: LoadIntelligencePlaylistMessage,
    playlistComponent: PlaylistComponent
  ) {
    // 获取心动模式原始列表
    const intelRes = await intelligence({
      id: message.id, // 当前歌曲 id
      pid: message.pid, // 歌单 id
      sid: message.sid // 起始歌曲 id
    })

    await match(intelRes)
      .with({ ok: true }, async ({ val }) => {
        // 填充心动模式 Buffer
        playlistComponent.intelligenceList.push(...val.songs)
        //立刻激活第一首
        const next = playlistComponent.intelligenceList.shift()!
        PlaySongMessage.send(next)
      })
      .with({ ok: false }, ({ val: err }) => {
        MessageWriter.error(new Error(err))
      })
      .exhaustive()
  }

  /**
   * *设置新的播放列表
   */
  @System()
  setPlaylist(
    @Message(SetPlaylistMessage) message: SetPlaylistMessage,
    playlistComponent: PlaylistComponent
  ) {
    //更新列表和索引
    playlistComponent.currentList = message.songs
    playlistComponent.playlistDetail = message.detail
    playlistComponent.currentIndex = 0
  }
}
