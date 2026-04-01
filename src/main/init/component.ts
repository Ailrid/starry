import { Component, type ViridApp } from '@virid/core'

@Component()
export class ElectronComponent {
  public port: number = 1566
}

export function bindElectronComponents(app: ViridApp) {
  app.bindComponent(ElectronComponent)
}
