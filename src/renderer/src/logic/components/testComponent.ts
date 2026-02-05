import { Responsive } from '@/ccs/decorators/vue'
import { Component } from '@/ccs/decorators/ccs'

class Player {
  play(song: Song) {
    console.log('Play song:', song)
  }
  pause(state: boolean) {
    console.log('Paused:', state)
  }
  changeVolume(volume: number) {
    console.log('Volume changed:', volume)
  }
  changePlayMode(mode: string) {
    console.log('Play mode changed:', mode)
  }
}
export class Song {
  constructor(
    public name: string,
    public id: string
  ) {}
}

@Component()
export class PlaylistComponent {
  // 响应式状态
  @Responsive()
  public currentSong: Song = null!
  @Responsive()
  public playlist: Song[] = []
}

@Component()
export class PlayerComponent {
  // 响应式状态
  public player: Player = new Player()
}
