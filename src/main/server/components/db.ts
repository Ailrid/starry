import { Component } from '@virid/core'
import { type Database } from 'better-sqlite3'
@Component()
export class DatabaseComponent {
  public db: Database = null!
  public cachePath: string = ''
}
