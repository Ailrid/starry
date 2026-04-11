import { BrowserWindow, dialog, shell } from 'electron'
import {
  MinimizeWindowMessage,
  CloseWindowMessage,
  MaximizeWindowMessage,
  OpenDialogMessage,
  RenderDialogMessage,
  CreateMainWindowMessage,
  ExecuteCommandQueueMessage,
  SetCommandQueueMessage,
  CheckClipboardMessage,
  ShowWindowMessage,
  HiddenWindowMessage
} from './message'
import { System, Message, MessageWriter } from '@virid/core'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'

import { WindowComponent } from './component'
/**
 * * 与窗口相关的一些事情
 */
export class WindowControllerSystem {
  @System()
  static closeWindow(@Message(CloseWindowMessage) message: CloseWindowMessage) {
    message.senderWindow.close()
  }
  @System()
  static hiddenWindow(@Message(HiddenWindowMessage) message: HiddenWindowMessage) {
    message.senderWindow.hide()
  }
  @System()
  static minimizeWindow(@Message(MinimizeWindowMessage) message: MinimizeWindowMessage) {
    message.senderWindow.minimize()
  }
  @System()
  static maximizeWindow(@Message(MaximizeWindowMessage) message: MaximizeWindowMessage) {
    if (message.senderWindow.isMaximized()) {
      message.senderWindow.unmaximize()
    } else {
      message.senderWindow.maximize()
    }
  }

  @System()
  static showWindow(
    @Message(ShowWindowMessage) message: ShowWindowMessage,
    windowComponent: WindowComponent
  ) {
    if (!windowComponent.windows.has(message.windowName)) return
    windowComponent.windows.get(message.windowName)!.show()
  }

  @System()
  static async openDialog(@Message(OpenDialogMessage) message: OpenDialogMessage) {
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

/**
 * * 创建窗口
 */
export class BrowserWindowSystem {
  /*
   * 初始化主窗口
   */
  @System()
  static createMainWindow(
    @Message(CreateMainWindowMessage) message: CreateMainWindowMessage,
    windowComponent: WindowComponent
  ) {
    const mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 900,
      minHeight: 600,
      show: false,
      autoHideMenuBar: true,
      titleBarStyle: 'hidden',
      titleBarOverlay: false,
      backgroundColor: '#00000000',
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })

    mainWindow.on('ready-to-show', () => {
      mainWindow.show()
      // 触发命令队列,执行所有缓存命令
      ExecuteCommandQueueMessage.send('mainWindow')
      // 注册自己
      windowComponent.windows.set('mainWindow', mainWindow)
    })
    // 获得焦点时自动检查一遍剪切板
    mainWindow.on('focus', () => {
      CheckClipboardMessage.send()
    })
    mainWindow.webContents.setWindowOpenHandler(details => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })
    mainWindow.loadURL(`http://localhost:${message.port}`)

    MessageWriter.info(
      '[BrowserWindowSystem] MainWindow: Initialize window and mount page completed.'
    )
  }

  /**
   * * 当窗口准备好时执行对应的所有命令
   */
  @System()
  static windowReady(
    @Message(ExecuteCommandQueueMessage) message: ExecuteCommandQueueMessage,
    windowComponent: WindowComponent
  ) {
    // 执行所有暂存的命令
    const window = windowComponent.windows.get(message.window)
    if (!window) return
    windowComponent.commandQueue.get(message.window)?.forEach(fn => fn(window))
  }

  /**
   * * 缓存所有窗口的命令
   */
  @System()
  static setWindowCommand(
    @Message(SetCommandQueueMessage) message: SetCommandQueueMessage,
    windowComponent: WindowComponent
  ) {
    const queue = windowComponent.commandQueue.get(message.window) || []
    queue.push(message.command)
    windowComponent.commandQueue.set(message.window, queue)
  }
}
