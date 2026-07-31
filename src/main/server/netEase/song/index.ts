import { ExpressPlugin } from '@virid/express'
import {
  SongCommentsSystem,
  SongDetailSystem,
  SongLikeCheckSystem,
  SongLikeSystem
} from './systems'

import {
  SongCommentRequestMessage,
  SongDetailRequestMessage,
  SongLikeRequestMessage,
  SongLikeCheckRequestMessage
} from './message'
export function SongSystemsBunch(plugin: ExpressPlugin) {
  plugin.bindRoute(SongCommentRequestMessage)
  plugin.bindRoute(SongDetailRequestMessage)
  plugin.bindRoute(SongLikeRequestMessage)
  plugin.bindRoute(SongLikeCheckRequestMessage)

  plugin.register(SongCommentsSystem.getComments)
  plugin.register(SongDetailSystem.getDetail)
  plugin.register(SongLikeCheckSystem.checkLike)
  plugin.register(SongLikeSystem.toggleLike)
}
