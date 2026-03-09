import { dialog, BrowserWindow } from 'electron'
import {
  CloseWindowMessage,
  MinimizeWindowMessage,
  MaximizeWindowMessage,
  OpenDialogMessage,
  RenderDialogMessage,
  NeteaseWindowMessage
} from './message'
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
  @System()
  async openDialog(@Message(OpenDialogMessage) message: OpenDialogMessage) {
    // 调用原生对话框
    const result = await dialog.showOpenDialog(message.senderWindow, message.options)
    // 如果用户没有取消，并且确实选择了文件
    if (!result.canceled && result.filePaths.length > 0) {
      const selectedPath = result.filePaths[0]
      return new RenderDialogMessage(selectedPath)
    }
    return
  }
}

export class NeteaseVerifySystem {
  // 在 WindowSystem 或者 InitSystem 中增加
  @System({
    messageClass: NeteaseWindowMessage
  })
  static async handleVerification(
  ) {
    const verifyWin = new BrowserWindow({
      width: 1200,
      height: 800,
      modal: true,
      parent: BrowserWindow.getFocusedWindow() || undefined,
      webPreferences: {
        // 验证页面不需要 preload，给它最纯净的环境
        nodeIntegration: false,
        contextIsolation: true
      }
    })
  }
}
