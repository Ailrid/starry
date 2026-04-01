import { EventMessage, SingleMessage } from '@virid/core'
import { FromRenderMessage, FromRender, ToRenderMessage } from '@virid/main'
import { type BrowserWindow } from 'electron'
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
