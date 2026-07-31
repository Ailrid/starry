import type { PlaylistDetail, SongDetail } from '@main/server/netEase'
import { EventMessage, SingleMessage } from '@virid/core'
import { FromRenderer, FromRendererMessage, MainPlugin, ToRendererMessage } from '@virid/main'

export class InitDatabaseMessage extends EventMessage {
  constructor(
    public path: string,
    public cachePath: string
  ) {
    super()
  }
}

export class RecoverPlaybackMessage extends SingleMessage {}

export class _RecoverPlaybackMessage extends ToRendererMessage {
  __virid_target: string = 'renderer'
  __virid_message_type: string = 'recover-playback'
  constructor(
    public playlistDetail: PlaylistDetail,
    public playlistSongs: SongDetail[],
    public currentSong: SongDetail
  ) {
    super()
  }
}

@FromRenderer('backup-playback')
export class BackupPlaybackMessage extends FromRendererMessage {
  constructor(
    public playlistDetail: PlaylistDetail,
    public playlistSongs: SongDetail[],
    public currentSong: SongDetail
  ) {
    super()
  }
}

export function bindDatabaseMessages(plugin: MainPlugin) {
  plugin.bindRoute(BackupPlaybackMessage)
}
