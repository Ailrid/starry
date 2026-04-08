import { EventMessage, SingleMessage } from '@virid/core'
import { FromRendererMessage, FromRenderer, ToRendererMessage } from '@virid/main'
import { type BrowserWindow } from 'electron'

// 渲染进程发来的操作消息
@FromRenderer('close-window')
export class CloseWindowMessage extends FromRendererMessage {}

@FromRenderer('minimize-window')
export class MinimizeWindowMessage extends FromRendererMessage {}

@FromRenderer('maximize-window')
export class MaximizeWindowMessage extends FromRendererMessage { }
@FromRenderer('hidden-window')
export class HiddenWindowMessage extends FromRendererMessage { }

// 内部的操作消息
export class ShowWindowMessage extends SingleMessage {
  constructor(public windowName: string = 'mainWindow') {
    super()
  }
}


@FromRenderer('open-dialog')
export class OpenDialogMessage extends FromRendererMessage {
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
export class RenderDialogMessage extends ToRendererMessage {
  __virid_target: string = 'renderer'
  __virid_messageType: string = 'file-dialog'
  constructor(public path: string) {
    super()
  }
}

export class PlaySongMessage extends ToRendererMessage {
  __virid_target: string = 'renderer'
  __virid_messageType: string = 'play-song'
  constructor(public id: string) {
    super()
  }
}
export class SetPlaylistMessage extends ToRendererMessage {
  __virid_target: string = 'renderer'
  __virid_messageType: string = 'set-playlist'
  constructor(public id: string) {
    super()
  }
}

export class PlayOrPauseMessage extends ToRendererMessage {
  __virid_target: string = 'renderer'
  __virid_messageType: string = 'play-or-pause'
}

export class NextSongMessage extends ToRendererMessage {
  __virid_target: string = 'renderer'
  __virid_messageType: string = 'next-song'
}

export class PreviousSongMessage extends ToRendererMessage {
  __virid_target: string = 'renderer'
  __virid_messageType: string = 'previous-song'
}
export class BackupAndCloseMessage extends ToRendererMessage {
  __virid_target: string = 'renderer'
  __virid_messageType: string = 'backup-playback'
}

export class CreateMainWindowMessage extends SingleMessage {
  constructor(public port: number) {
    super()
  }
}

export class ExecuteCommandQueueMessage extends EventMessage {
  constructor(public window: string) {
    super()
  }
}

export class SetCommandQueueMessage extends EventMessage {
  constructor(
    public window: string,
    public command: (window: BrowserWindow) => void
  ) {
    super()
  }
}

export class CheckClipboardMessage extends EventMessage {}

export class ShareMusicCommandMessage extends EventMessage {
  constructor(public url: string) {
    super()
  }
}
