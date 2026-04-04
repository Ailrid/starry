import { BrowserWindow, clipboard, dialog, shell } from 'electron'
import {
  CloseWindowMessage,
  MinimizeWindowMessage,
  MaximizeWindowMessage,
  OpenDialogMessage,
  RenderDialogMessage,
  CreateMainWindowMessage,
  ShareMusicCommandMessage,
  PlaySongMessage,
  ExecuteCommandQueueMessage,
  SetCommandQueueMessage,
  CheckClipboardMessage,
  SetPlaylistMessage
} from './message'
import { System, Message, MessageWriter } from '@virid/core'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'

import { WindowComponent } from './component'

export class WindowControllerSystem {
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

/**
 * * 网易云分享系统
 */
export class MusicShareSystem {
  private static lastHandledText = ''

  @System({
    messageClass: CheckClipboardMessage
  })
  static checkClipboard() {
    const text = clipboard.readText().trim()
    if (text === this.lastHandledText) return // 跳过重复执行
    if (text.startsWith('orpheus://') || text.includes('music.163.com')) {
      this.lastHandledText = text
      // 处理url
      ShareMusicCommandMessage.send(text)
    }
  }

  /**
   * * 处理 orpheus://协议或者music.163.com的连接
   */
  @System()
  static processMusicCommand(
    @Message(ShareMusicCommandMessage) message: ShareMusicCommandMessage,
    windowComponent: WindowComponent
  ) {
    const rawUrl = message.url
    const mainWindow = windowComponent.windows.get('mainWindow')
    if (rawUrl.includes('music.163.com') && rawUrl.startsWith('https://')) {
      // 如果是网址，解析其中的song?id=xxx或者playlist?id=xxx参数
      const url = new URL(rawUrl.replace('/#/', '/'))
      const id = url.searchParams.get('id')
      const type = url.pathname.includes('playlist') ? 'playlist' : 'song'
      // 根据指令执行动作
      if (type && id) this.sendCommand(type, id, mainWindow)
    } else if (rawUrl.includes('orpheus://')) {
      try {
        // 去掉协议头 orpheus:// 和可能存在的冗余斜杠
        const base64Part = rawUrl.replace('orpheus://', '').replace(/^\/+/, '')
        if (!base64Part) return
        // Base64 解码
        const jsonStr = Buffer.from(base64Part, 'base64').toString('utf8')
        const data = JSON.parse(jsonStr)
        // 根据指令执行动作
        if (data.type && data.id) this.sendCommand(data.type, data.id, mainWindow)
      } catch (err) {
        MessageWriter.error(err as Error, `[MusicShareSystem] Unable to parse URL : ${rawUrl}`)
      }
    }
  }

  /**
   * * 发射消息或者暂时缓存
   */
  private static sendCommand(
    type: 'song' | 'playlist',
    id: string,
    window: BrowserWindow | undefined
  ) {
    const command = () => {
      if (type === 'song') PlaySongMessage.send(id)
      else if (type === 'playlist') SetPlaylistMessage.send(id)
    }

    // 如果窗口已经好了，直接发射消息
    if (window) {
      command()
    } else {
      // 否则暂时缓存起来
      SetCommandQueueMessage.send('mainWindow', command)
    }
  }
}
