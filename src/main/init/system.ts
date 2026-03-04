import { System, MessageWriter, Message } from '@virid/core'
import { CreateMainWindowMessage, BootStrapElectronMessage } from './message'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'

export class InitSystem {
  /*
   *
   * 初始化electronApp
   */
  @System()
  static initApp(@Message(BootStrapElectronMessage) message: BootStrapElectronMessage) {
    //配置设置
    electronApp.setAppUserModelId('starry')
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })
    //创建窗口
    CreateMainWindowMessage.send(message.port)
    //mac用的东西
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) CreateMainWindowMessage.send(message.port)
    })
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
    MessageWriter.info('[Main] Initialization: App Initialization completed.')
  }
  /*
   * 初始化主窗口
   */
  @System()
  static createMainWindow(@Message(CreateMainWindowMessage) message: CreateMainWindowMessage) {
    const mainWindow = new BrowserWindow({
      width: 900,
      height: 670,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })

    mainWindow.on('ready-to-show', () => {
      mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })
    mainWindow.loadURL(`http://localhost:${message.port}`)
    MessageWriter.info('[Main] MainWindow: Initialize window and mount page completed.')
  }
}
