import { request } from '../../request'
import { Result } from 'ts-results'
import { SearchSuggestRequest, SearchType, SearchRequest } from './types'
import { SearchSuggestResponse, SearchResultMap } from './types'
//-----------------------search_suggest---------------------------------------------------
/**
 * *搜索建议
 */
export async function searchSuggest(
  params: SearchSuggestRequest
): Promise<Result<SearchSuggestResponse, string>> {
  return await request<SearchSuggestRequest, SearchSuggestResponse>(
    '/netease/search/suggest',
    params
  )
}

//-----------------------search---------------------------------------------------
/**
 * * 增强版搜索函数
 */
export async function search<T extends SearchType>(
  params: SearchRequest<T>
): Promise<Result<SearchResultMap[T], string>> {
  return await request<SearchRequest<T>, SearchResultMap[T]>('/netease/search', params)
}
