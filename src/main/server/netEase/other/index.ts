import { ExpressPlugin } from '@virid/express'
import {
  CommentSystem,
  PersonalFmSystem,
  HomepageSystem,
  IntelligenceListSystem,
  MvDetailSystem,
  MvUrlSystem,
  RecommendPlaylistSystem,
  RecommendSongsSystem,
  VipInfoSystem
} from './systems'

import {
  CommentRequestMessage,
  IntelligenceModeRequestMessage,
  MvDetailRequestMessage,
  MvUrlRequestMessage,
  FmModeRequestMessage,
  RecommendPlaylistRequestMessage,
  RecommendSongRequestMessage,
  VipInfoRequestMessage,
  HomepageRequestMessage
} from './message'
export function OtherSystemsBunch(plugin: ExpressPlugin) {
  plugin.bindRoute(CommentRequestMessage)
  plugin.bindRoute(IntelligenceModeRequestMessage)
  plugin.bindRoute(MvDetailRequestMessage)
  plugin.bindRoute(MvUrlRequestMessage)
  plugin.bindRoute(FmModeRequestMessage)
  plugin.bindRoute(RecommendPlaylistRequestMessage)
  plugin.bindRoute(RecommendSongRequestMessage)
  plugin.bindRoute(VipInfoRequestMessage)
  plugin.bindRoute(HomepageRequestMessage)
  plugin.register(CommentSystem.executeComment)
  plugin.register(PersonalFmSystem.getPersonalFm)
  plugin.register(HomepageSystem.getRecommendPlaylists)
  plugin.register(IntelligenceListSystem.getIntelligenceList)
  plugin.register(MvDetailSystem.getMvDetail)
  plugin.register(MvUrlSystem.getMvUrl)
  plugin.register(RecommendPlaylistSystem.getRecommendPlaylists)
  plugin.register(RecommendSongsSystem.getRecommendSongs)
  plugin.register(VipInfoSystem.getVipInfo)
}
