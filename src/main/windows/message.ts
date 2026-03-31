import { type PlaylistDetail, type SongDetail } from '@main/server/netEase'
import { SingleMessage } from '@virid/core'
import { FromRenderMessage, FromRender, ToRenderMessage } from '@virid/main'
@FromRender('close-window')
export class CloseWindowMessage extends FromRenderMessage {}

@FromRender('minimize-window')
export class MinimizeWindowMessage extends FromRenderMessage {}

@FromRender('maximize-window')
export class MaximizeWindowMessage extends FromRenderMessage {}

@FromRender('open-dialog')
export class OpenDialogMessage extends FromRenderMessage {
  constructor(
    public options: {
      title?: string
      filters?: Array<{ name: string; extensions: string[] }>
      properties?: Array<'openFile' | 'openDirectory' | 'multiSelections' | 'showHiddenFiles'>
    }
  ) {
    super()
  }
}
export class RenderDialogMessage extends ToRenderMessage {
  __virid_target: string = 'renderer'
  __virid_messageType: string = 'file-dialog'
  constructor(public path: string) {
    super()
  }
}

export class PlaySongMessage extends ToRenderMessage {
  __virid_target: string = 'renderer'
  __virid_messageType: string = 'play-song'
  constructor(public id: string) {
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

export class RecoverPlaybackSignalMessage extends SingleMessage {}

export class RecoverPlaybackMessage extends ToRenderMessage {
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
