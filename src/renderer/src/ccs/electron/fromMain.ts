import { FromMain, ToMainMessage, FromMainMessage } from '@virid/renderer'
import { type PlaylistDetail, type SongDetail } from '@/utils'
import { Message, System } from '@virid/core'
import { PlaylistComponent, PlaySongMessage, SetPlaylistMessage } from '../playback'
import { CloseWindowMessage } from './toMain'
/**
 * * 主进程发起，恢复上次的歌单和歌曲
 */
@FromMain('recover-playback')
export class RecoverPlaybackMessage extends FromMainMessage {
  constructor(
    public playlistDetail: PlaylistDetail,
    public playlistSongs: SongDetail[],
    public currentSong: SongDetail
  ) {
    super()
  }
}

/**
 * * 主进程发起或者自身发起，备份播放列表并关闭窗口
 */
@FromMain('backup-playback')
export class BackupPlaybackMessage extends FromMainMessage {}

export class _BackupPlaybackMessage extends ToMainMessage {
  __virid_messageType: string = 'backup-playback'
  __virid_target: string = 'main'
  constructor(
    public playlistDetail: PlaylistDetail,
    public playlistSongs: SongDetail[],
    public currentSong: SongDetail
  ) {
    super()
  }
}

/**
 * * 播放列表备份系统
 */
export class PlaybackRecoverAndBackupSystem {
  @System({
    priority: 1000
  })
  static async recover(@Message(RecoverPlaybackMessage) message: RecoverPlaybackMessage) {
    const { playlistDetail, playlistSongs, currentSong } = message
    SetPlaylistMessage.send(playlistSongs, playlistDetail)
    PlaySongMessage.send(currentSong, false)
  }
  @System({
    messageClass: BackupPlaybackMessage,
    priority: -100
  })
  async backup(playlistComponent: PlaylistComponent) {
    if (playlistComponent.playlistDetail && playlistComponent.currentSong)
      // 数据脱水
      // 这两条消息通过ipc到达主进程之后是顺序的，因此关闭之前一定已经备份完成了
      _BackupPlaybackMessage.send(
        JSON.parse(JSON.stringify(playlistComponent.playlistDetail)),
        JSON.parse(JSON.stringify(playlistComponent.currentList)),
        JSON.parse(JSON.stringify(playlistComponent.currentSong))
      )
    CloseWindowMessage.send()
  }
}
