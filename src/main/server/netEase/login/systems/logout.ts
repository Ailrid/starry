// import { createRequest, CryptoMode } from '../../utils'
// import { Cookies, Headers, HttpSystem, Ok } from '@virid/express'
import { HttpSystem, Ok } from '@virid/express'
import { LogoutRequestMessage } from '../message'
import { DatabaseComponent } from '@main/persistence'
import { CreateLoginWindowMessage } from '@main/windows'

export class LogoutSystem {
  @HttpSystem({
    messageClass: LogoutRequestMessage
  })
  public static async logout(dbComponent: DatabaseComponent) {
    const requiredKeys = ['__csrf', 'MUSIC_A_T', 'MUSIC_R_T', 'MUSIC_U']
    const clearCookieHeaders = requiredKeys.map(key => `${key}=; Path=/; Max-Age=0;`)
    // 删除数据库中的cookie
    dbComponent.db.removeCookies()
    // 删除备份的歌单
    dbComponent.db.removePlaybackSnap()
    // 然后打开登陆窗口
    CreateLoginWindowMessage.send()

    // 返回时带上这些 Header
    return Ok(
      { success: true },
      {
        'Set-Cookie': clearCookieHeaders
      }
    )
  }
}
