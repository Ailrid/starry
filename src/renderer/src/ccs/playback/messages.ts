import { SingleMessage } from '@virid/core'
import { PlaylistDetail, SongDetail } from '@/utils/server'

export class PlaySongMessage extends SingleMessage {
  constructor(
    public song: SongDetail,
    public playImmediately: boolean = true
  ) {
    super()
  }
}
export class PlayOrPauseMessage extends SingleMessage {
  constructor(public play: boolean) {
    super()
  }
}
export class NextSongMessage extends SingleMessage {}
export class PreviousSongMessage extends SingleMessage {}

export class SetVolumeMessage extends SingleMessage {
  constructor(public volume: number) {
    super()
  }
}
export class SeekTimeMessage extends SingleMessage {
  constructor(public newTime: number) {
    super()
  }
}
export class SetPlaylistMessage extends SingleMessage {
  constructor(
    public songs: SongDetail[],
    public detail: PlaylistDetail
  ) {
    super()
  }
}
export class SetPlayModeMessage extends SingleMessage {
  constructor(public playMode: 'order' | 'random' | 'loop' | 'fm' | 'intelligence') {
    super()
  }
}

// 加载fm和心动模式的歌单消息
export class LoadFMPlaylistMessage extends SingleMessage {
  // 是否立刻播放和强制刷新
  constructor(
    public playImmediately: boolean = false,
    public forceRefresh: boolean = false
  ) {
    super()
  }
}
export class LoadIntelligencePlaylistMessage extends SingleMessage {
  // 是否立刻播放和强制刷新
  constructor(
    public playImmediately: boolean = false,
    public forceRefresh: boolean = false
  ) {
    super()
  }
}

export class MediaSessionMessage extends SingleMessage {}

export class SongLikeMessage extends SingleMessage {}
