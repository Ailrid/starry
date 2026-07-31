import { dialog } from 'electron'
import {
  MinimizeWindowMessage,
  CloseWindowMessage,
  MaximizeWindowMessage,
  OpenDialogMessage,
  RenderDialogMessage,
  ExecuteCommandQueueMessage,
  SetCommandQueueMessage,
  ShowWindowMessage,
  HiddenWindowMessage
} from './message'
import { System, ViridApp } from '@virid/core'
import { WindowComponent } from './component'
/**
 * * 与窗口相关的一些事情
 */
export class WindowControllerSystem {
  @System()
  static closeWindow(message: CloseWindowMessage) {
    message.senderWindow.close()
  }
  @System()
  static hiddenWindow(message: HiddenWindowMessage) {
    message.senderWindow.hide()
  }
  @System()
  static minimizeWindow(message: MinimizeWindowMessage) {
    message.senderWindow.minimize()
  }
  @System()
  static maximizeWindow(message: MaximizeWindowMessage) {
    if (message.senderWindow.isMaximized()) {
      message.senderWindow.unmaximize()
    } else {
      message.senderWindow.maximize()
    }
  }

  @System()
  static showWindow(message: ShowWindowMessage, windowComponent: WindowComponent) {
    if (!windowComponent.windows.has(message.windowName)) return
    windowComponent.windows.get(message.windowName)!.show()
  }

  @System()
  static async openDialog(message: OpenDialogMessage) {
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

export class WindowCommandSystem {
  /**
   * * 当窗口准备好时执行对应的所有命令
   */
  @System()
  static windowReady(message: ExecuteCommandQueueMessage, windowComponent: WindowComponent) {
    // 执行所有暂存的命令
    const window = windowComponent.windows.get(message.window)
    if (!window) return
    windowComponent.commandQueue.get(message.window)?.forEach(fn => fn(window))
  }

  /**
   * * 缓存所有窗口的命令
   */
  @System()
  static setWindowCommand(message: SetCommandQueueMessage, windowComponent: WindowComponent) {
    if (
      windowComponent.windows.has(message.window) &&
      windowComponent.windows.get(message.window)!.isVisible()
    ) {
      message.command(windowComponent.windows.get(message.window)!)
      return
    }
    const queue = windowComponent.commandQueue.get(message.window) || []
    queue.push(message.command)
    windowComponent.commandQueue.set(message.window, queue)
    // 如果窗口已经准备好了，直接发射
  }
}
export function registerWindowSystems(app: ViridApp) {
  app.register(WindowControllerSystem.closeWindow)
  app.register(WindowControllerSystem.hiddenWindow)
  app.register(WindowControllerSystem.minimizeWindow)
  app.register(WindowControllerSystem.maximizeWindow)
  app.register(WindowControllerSystem.showWindow)
  app.register(WindowControllerSystem.openDialog)

  app.register(WindowCommandSystem.windowReady)
  app.register(WindowCommandSystem.setWindowCommand)
}
