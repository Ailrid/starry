import { dialog } from 'electron'
import {
  CloseWindowMessage,
  MinimizeWindowMessage,
  MaximizeWindowMessage,
  OpenDialogMessage,
  RenderDialogMessage,
  BackupPlaybackMessage,
  RecoverPlaybackSignalMessage,
  RecoverPlaybackMessage
} from './message'
import { System, Message, MessageWriter } from '@virid/core'
import { DatabaseComponent } from '@main/server'

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

/**
 * * 播放列表备份系统
 */
export class PlaybackSystem {
  @System({
    priority: 1000
  })
  static async backup(
    @Message(BackupPlaybackMessage) message: BackupPlaybackMessage,
    dbComp: DatabaseComponent
  ) {
    const { playlistDetail, playlistSongs, currentSong } = message
    const sql = `
    REPLACE INTO playback_snap (id, playlist_detail, songs_list, current_song, updated_at)
    VALUES (1, ?, ?, ?, datetime('now'))
  `
    try {
      dbComp.db
        .prepare(sql)
        .run(
          JSON.stringify(playlistDetail),
          JSON.stringify(playlistSongs),
          JSON.stringify(currentSong)
        )
    } catch (err) {
      MessageWriter.error(err as Error, '[Playback System] Cannot save playback snapshot')
    }
  }
  @System({
    messageClass: RecoverPlaybackSignalMessage
  })
  async recover(dbComp: DatabaseComponent) {
    try {
      const row = dbComp.db.prepare('SELECT * FROM playback_snap WHERE id = 1').get() as any
      if (row) {
        RecoverPlaybackMessage.send(
          JSON.parse(row.playlist_detail),
          JSON.parse(row.songs_list),
          JSON.parse(row.current_song)
        )
      }
    } catch (err) {
      MessageWriter.error(err as Error, '[Playback System] Cannot read snapshot from database')
    }
  }
}
