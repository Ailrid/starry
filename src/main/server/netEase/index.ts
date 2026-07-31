import { ExpressPlugin } from '@virid/express'
import { AlbumSystemsBunch } from './album'
import { ArtistSystemsBunch } from './artist'
import { LoginSystemsBunch } from './login'
import { OtherSystemsBunch } from './other'
import { PlaylistSystemsBunch } from './playlist'
import { SearchSystemsBunch } from './search'
import { SongSystemsBunch } from './song'
import { UserSystemsBunch } from './user'
import { ViridApp } from '@virid/core'
export * from './utils'
export function netEaseSystemsBunch(app: ViridApp, plugin: ExpressPlugin) {
  AlbumSystemsBunch(plugin)
  ArtistSystemsBunch(plugin)
  LoginSystemsBunch(app, plugin)
  OtherSystemsBunch(plugin)
  PlaylistSystemsBunch(plugin)
  SearchSystemsBunch(plugin)
  SongSystemsBunch(plugin)
  UserSystemsBunch(plugin)
}
