import { FromRenderMessage } from '@virid/main'
export class CloseWinodwMessage extends FromRenderMessage {}
export class MinimizeWindowMessage extends FromRenderMessage {}
export class MaximizeWindowMessage extends FromRenderMessage {}
export const MESSAGE_MAP = {
  'close-window': CloseWinodwMessage,
  'minimize-window': MinimizeWindowMessage,
  'maximize-window': MaximizeWindowMessage
}
