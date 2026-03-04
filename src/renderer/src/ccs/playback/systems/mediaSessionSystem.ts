import { System } from '@virid/core'
import { CurrentSongChangedMessage } from '../messages'
import { LyricComponent, PlaylistComponent } from '../components'

export class MediaSessionSystem {
  @System({
    messageClass: CurrentSongChangedMessage
  })
  async changeSongMetadata(lyricComponent: LyricComponent, playlistComponent: PlaylistComponent) {
    const currentSong = playlistComponent.currentSong

    if (!currentSong) return

    navigator.mediaSession.metadata = new MediaMetadata({
      title: lyricComponent.lyric?.lyrics[0].text,
      // artist: currentSong.artists.map((a) => a.name).join('/'),
      // album: currentSong.album.name,
      artwork: [{ src: `${currentSong.album.cover}?param=512y512`, sizes: '512x512' }]
    })
    // 播放状态是每次消息过来都要更新的
    navigator.mediaSession.setPositionState({
      // 总时长
      duration: currentSong.duration,
      // 播放速率
      playbackRate: 1,
      // 当前播放到的时间
      position: 0
    })
  }
}
