import { SingleMessage } from '@virid/core'
import { PlaylistDetail, SongDetail } from './interface'

class PlaySongMessage extends SingleMessage {
  constructor(public song: SongDetail) {
    super()
  }
}
class PlayOrPauseMessage extends SingleMessage {
  constructor(public play: boolean) {
    super()
  }
}
class NextSongMessage extends SingleMessage {}
class PreviousSongMessage extends SingleMessage {}

class SetVolumeMessage extends SingleMessage {
  constructor(public volume: number) {
    super()
  }
}
class SetPlaylistMessage extends SingleMessage {
  constructor(
    public songs: SongDetail[],
    public detail: PlaylistDetail
  ) {
    super()
  }
}
class SetPlayModeMessage extends SingleMessage {
  constructor(public playMode: 'order' | 'random' | 'loop' | 'fm' | 'intellgence') {
    super()
  }
}

class LoadFMPlaylistMessage extends SingleMessage {}
class LoadIntellgencePlaylistMessage extends SingleMessage {
  constructor(
    public id: number,
    public pid: number,
    public sid: number
  ) {
    super()
  }
}

export {
  PlaySongMessage,
  PlayOrPauseMessage,
  NextSongMessage,
  PreviousSongMessage,
  SetVolumeMessage,
  SetPlaylistMessage,
  SetPlayModeMessage,
  LoadFMPlaylistMessage,
  LoadIntellgencePlaylistMessage
}
