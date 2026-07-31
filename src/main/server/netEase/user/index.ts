import { ExpressPlugin } from '@virid/express'
import {
  UserAccountSystem,
  UserDetailSystem,
  UserPlaylistSystem,
  UserRecordSystem,
  UserSubCountSystem
} from './systems'

import {
  UserAccountRequestMessage,
  UserDetailRequestMessage,
  UserPlaylistRequestMessage,
  UserRecordRequestMessage,
  UserSubCountRequestMessage
} from './message'
export function UserSystemsBunch(plugin: ExpressPlugin) {
  plugin.bindRoute(UserAccountRequestMessage)
  plugin.bindRoute(UserDetailRequestMessage)
  plugin.bindRoute(UserPlaylistRequestMessage)
  plugin.bindRoute(UserRecordRequestMessage)
  plugin.bindRoute(UserSubCountRequestMessage)

  plugin.register(UserAccountSystem.getAccount)
  plugin.register(UserDetailSystem.getDetail)
  plugin.register(UserPlaylistSystem.getUserPlaylists)
  plugin.register(UserRecordSystem.getRecord)
  plugin.register(UserSubCountSystem.getSubCount)
}
