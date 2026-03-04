import { CloseWindowMessage, MinimizeWindowMessage, MaximizeWindowMessage } from './message'
import { System, Message } from '@virid/core'

export class WindowSystem {
  @System()
  closeWindow(@Message(CloseWindowMessage) message: CloseWindowMessage) {
    message.senderWindow.close()
  }
  @System()
  minimizeWindow(@Message(MinimizeWindowMessage) message: MinimizeWindowMessage) {
    message.senderWindow.minimize()
  }
  @System()
  maximizeWindow(@Message(MaximizeWindowMessage) message: MaximizeWindowMessage) {
    if (message.senderWindow.isMaximized()) {
      message.senderWindow.unmaximize()
    } else {
      message.senderWindow.maximize()
    }
  }
}
