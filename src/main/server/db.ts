import { type DatabaseComponent } from '@main/components'
let _internalDb: DatabaseComponent | null = null

export const dbComponent = new Proxy({} as DatabaseComponent, {
  get(_, prop) {
    if (!_internalDb) {
      // 在这里抛出明确的错误
      throw new Error(
        `[Datebase Error]: Attempt To Access Database Failed: The DataComponent has not been activated by activateDb yet.Please check if Initialization Message was sent correctly or if System initDatabase was executed successfully.`
      )
    }
    // 正常转发访问
    return Reflect.get(_internalDb, prop)
  }
})

export function activateDb(dbComponent: DatabaseComponent) {
  _internalDb = dbComponent
}
