import { EventMessage } from '@virid/core'

export class FetchUserAccountMessage extends EventMessage {}
export class FetchUserPlaylistMessage extends EventMessage {}
export class FetchUserPlaylistDetailMessage extends EventMessage {
  constructor(public playlistId: number) {
    super()
  }
}
export class FetchUserPlaylistSongMessage extends EventMessage {
  constructor(
    public playlistId: number,
    public pageIndex: number
  ) {
    super()
  }
}
export class LogoutMessage extends EventMessage {}
