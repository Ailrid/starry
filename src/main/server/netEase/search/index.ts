import { ExpressPlugin } from '@virid/express'
import { SearchSystem, SearchSuggestSystem } from './systems'

import { SearchRequestMessage, SearchSuggestRequestMessage } from './message'
export function SearchSystemsBunch(plugin: ExpressPlugin) {
  plugin.bindRoute(SearchRequestMessage)
  plugin.bindRoute(SearchSuggestRequestMessage)

  plugin.register(SearchSystem.search)
  plugin.register(SearchSuggestSystem.getSuggest)
}
