import { bindDatabaseComponents } from '@main/persistence'
import { bindWindowComponents } from '@main/windows'
import { bindElectronComponents } from './component'
import { type ViridApp } from '@virid/core'

export function bindComponents(app: ViridApp) {
  bindDatabaseComponents(app)
  bindWindowComponents(app)
  bindElectronComponents(app)
}

export * from './message'
export * from './system'
export * from './component'
