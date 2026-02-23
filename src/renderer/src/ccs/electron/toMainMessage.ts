import { ToMainMessage } from '@virid/renderer'

export class CloseWindowMessage extends ToMainMessage {
  __virid_target = 'main'
  __virid_messageType: string = 'close-window'
}
export class MinimizeWindowMessage extends ToMainMessage {
  __virid_target = 'main'
  __virid_messageType: string = 'minimize-window'
}
export class MaximizeWindowMessage extends ToMainMessage {
  __virid_target = 'main'
  __virid_messageType: string = 'maximize-window'
}
