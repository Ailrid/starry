import { Controller, MessageWriter } from '@virid/core'
import { Project, Responsive, Use, Watch } from '@virid/vue'
import { match } from 'ts-pattern'
import { useRoute } from 'vue-router'
import {
  search,
  SearchType,
  SearchResultMap,
  SongDetail,
  AlbumInfo,
  ArtistInfo,
  PlaylistInfo,
  UserInfo,
  MvInfo
} from '@/utils/server'

export interface SearchDataMap {
  [SearchType.Song]: SongDetail[]
  [SearchType.Album]: AlbumInfo[]
  [SearchType.Artist]: ArtistInfo[]
  [SearchType.Playlist]: PlaylistInfo[]
  [SearchType.User]: UserInfo[]
  [SearchType.Mv]: MvInfo[]
  [SearchType.Lyric]: SongDetail[]
}
export const categoryMap = {
  song: '歌曲',
  album: '专辑',
  artist: '艺人',
  playlist: '歌单',
  user: '用户',
  mv: '视频',
  lyric: '歌词'
} as const

let _song: SongDetail[] = []

let _artist: ArtistInfo[] = []

let _album: AlbumInfo[] = []

let _playlist: PlaylistInfo[] = []

let _user: UserInfo[] = []

let _mv: MvInfo[] = []

let _lyric: SongDetail[] = []
const keywordsHistory = {
  song: '',
  album: '',
  artist: '',
  playlist: '',
  user: '',
  mv: '',
  lyric: ''
}

const categoryList = ['song', 'album', 'artist', 'playlist', 'user', 'mv', 'lyric']
export type CategoryKey = keyof typeof categoryMap
export type CategoryValue = (typeof categoryMap)[CategoryKey]

@Controller()
export class SearchController {
  @Use(() => useRoute())
  public route!: ReturnType<typeof useRoute>

  @Project()
  get keywords(): string {
    return this.route.params.keywords as string
  }

  @Responsive()
  public isSidebarOpen: Boolean = true

  @Responsive()
  public song: SongDetail[] = _song
  @Responsive()
  public artist: ArtistInfo[] = _artist
  @Responsive()
  public album: AlbumInfo[] = _album
  @Responsive()
  public playlist: PlaylistInfo[] = _playlist
  @Responsive()
  public user: UserInfo[] = _user
  @Responsive()
  public mv: MvInfo[] = _mv
  @Responsive()
  public lyric: SongDetail[] = _lyric

  @Responsive()
  public currentView: CategoryKey = 'song'
  @Project()
  public get categoryName() {
    return categoryMap[this.currentView]
  }

  @Watch<SearchController>(i => i.currentView, { immediate: true })
  _getSearchResult() {
    if (keywordsHistory[this.currentView] === this.keywords) {
      return
    }
    match(this.currentView)
      .with('song', () => {
        this.searchGeneral(this.keywords, SearchType.Song, val => {
          this.song = val.items
          _song = val.items
        })
      })
      .with('album', () => {
        this.searchGeneral(this.keywords, SearchType.Album, val => {
          this.album = val.items
          _album = val.items
        })
      })
      .with('artist', () => {
        this.searchGeneral(this.keywords, SearchType.Artist, val => {
          this.artist = val.items
          _artist = val.items
        })
      })
      .with('playlist', () => {
        this.searchGeneral(this.keywords, SearchType.Playlist, val => {
          this.playlist = val.items
          _playlist = val.items
        })
      })
      .with('user', () => {
        this.searchGeneral(this.keywords, SearchType.User, val => {
          this.user = val.items
          _user = val.items
        })
      })
      .with('mv', () => {
        this.searchGeneral(this.keywords, SearchType.Mv, val => {
          this.mv = val.items
          _mv = val.items
        })
      })
      .with('lyric', () => {
        this.searchGeneral(this.keywords, SearchType.Lyric, val => {
          this.lyric = val.items
          _lyric = val.items
        })
      })
      .exhaustive()
    keywordsHistory[this.currentView] = this.keywords
  }

  async searchGeneral<T extends SearchType>(
    keywords: string,
    type: T,

    callback: (val: SearchResultMap[T]) => void
  ) {
    const searchSong = await search({
      keywords,
      type
    })
    match(searchSong)
      .with({ ok: true }, ({ val }) => {
        callback(val)
      })
      .with({ ok: false }, ({ val }) => {
        MessageWriter.error(new Error(val))
      })
      .exhaustive()
  }

  public onWheel(event: WheelEvent) {
    const { deltaY } = event
    let newName = ''
    if (deltaY > 0) {
      newName = categoryList[(categoryList.indexOf(this.currentView) + 1) % categoryList.length]
    } else {
      newName =
        categoryList[
          (categoryList.indexOf(this.currentView) - 1 + categoryList.length) % categoryList.length
        ]
    }
    this.currentView = newName as CategoryKey
  }
}
