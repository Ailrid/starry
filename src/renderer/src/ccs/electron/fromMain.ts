import { FromIpc, ToMainMessage, FromMainMessage } from '@virid/renderer'
import { type PlaylistDetail, type SongDetail } from '@/utils'
import { Message, System } from '@virid/core'
import { PlaylistComponent, PlaySongMessage, SetPlaylistMessage } from '../playback'
import { CloseWindowMessage } from './toMain'

@FromIpc('recover-playback')
export class RecoverPlaybackMessage extends FromMainMessage {
  constructor(
    public playlistDetail: PlaylistDetail,
    public playlistSongs: SongDetail[],
    public currentSong: SongDetail
  ) {
    super()
  }
}
@FromIpc('recover-playback-signal')
export class BackupPlaybackSignalMessage extends FromMainMessage {}

export class BackupPlaybackMessage extends ToMainMessage {
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
  static async backup(@Message(RecoverPlaybackMessage) message: RecoverPlaybackMessage) {
    const { playlistDetail, playlistSongs, currentSong } = message
    SetPlaylistMessage.send(playlistSongs, playlistDetail)
    PlaySongMessage.send(currentSong, false)
  }
  @System({
    messageClass: BackupPlaybackSignalMessage,
    priority: -100
  })
  async recover(playlistComponent: PlaylistComponent) {
    if (playlistComponent.playlistDetail && playlistComponent.currentSong)
      BackupPlaybackMessage.send(
        JSON.parse(JSON.stringify(playlistComponent.playlistDetail)),
        JSON.parse(JSON.stringify(playlistComponent.currentList)),
        JSON.parse(JSON.stringify(playlistComponent.currentSong))
      )
    CloseWindowMessage.send()
  }
}
