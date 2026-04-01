import type { PlaylistDetail, SongDetail } from '@main/server/netEase'
import { EventMessage, SingleMessage } from '@virid/core'
import { FromRender, FromRenderMessage, ToRenderMessage } from '@virid/main'

export class InitDatabaseMessage extends EventMessage {
  constructor(
    public path: string,
    public cachePath: string
  ) {
    super()
  }
}

export class SetPlaylistMessage extends ToRenderMessage {
  __virid_target: string = 'renderer'
  __virid_messageType: string = 'set-playlist'
  constructor(public id: string) {
    super()
  }
}

export class RecoverPlaybackMessage extends SingleMessage {}

export class _RecoverPlaybackMessage extends ToRenderMessage {
  __virid_target: string = 'renderer'
  __virid_messageType: string = 'recover-playback'
  constructor(
    public playlistDetail: PlaylistDetail,
    public playlistSongs: SongDetail[],
    public currentSong: SongDetail
  ) {
    super()
  }
}

@FromRender('backup-playback')
export class BackupPlaybackMessage extends FromRenderMessage {
  constructor(
    public playlistDetail: PlaylistDetail,
    public playlistSongs: SongDetail[],
    public currentSong: SongDetail
  ) {
    super()
  }
}
