import { Controller, MessageWriter } from '@virid/core'
import { Responsive, Watch } from '@virid/vue'
import { searchSuggest, SearchSuggestResponse } from '@/utils/server'
import { match } from 'ts-pattern'
@Controller()
export class TitleBarRightController {
  @Responsive()
  public searchText = ''

  @Responsive()
  public isSearchFocused = false

  @Responsive()
  public searchSuggest: SearchSuggestResponse | null = null

  @Watch<TitleBarRightController>(i => i.searchText)
  public async getSearchSuggest() {
    if (this.searchText === '') {
      this.searchSuggest = null
      return
    }

    const res = await searchSuggest({
      keywords: this.searchText,
      type: 'web'
    })
    match(res)
      .with({ ok: true }, ({ val }) => {
        this.searchSuggest = val
      })
      .with({ ok: false }, ({ val }) => {
        MessageWriter.error(new Error(val))
      })
      .exhaustive()
  }
}
