import { CloseWinodwMessage, MinimizeWindowMessage, MaximizeWindowMessage } from '@main/messages'
import { System, Message } from '@virid/core'

export class WinodwSystem {
  @System()
  closeWindow(@Message(CloseWinodwMessage) messsage: CloseWinodwMessage) {
    messsage.senderWindow.close()
  }
  @System()
  minimizeWindow(@Message(MinimizeWindowMessage) messsage: MinimizeWindowMessage) {
    messsage.senderWindow.minimize()
  }
  @System()
  maximizeWindow(@Message(MaximizeWindowMessage) messsage: MaximizeWindowMessage) {
    if (messsage.senderWindow.isMaximized()) {
      messsage.senderWindow.unmaximize()
    } else {
      messsage.senderWindow.maximize()
    }
  }
}
