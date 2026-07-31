import { EventMessage } from '@virid/core'
import { FromRenderer, FromRendererMessage, MainPlugin } from '@virid/main'
export class BootStrapElectronMessage extends EventMessage {
  constructor(public port: number) {
    super()
  }
}

export class RegisterProtocolMessage extends EventMessage {}

@FromRenderer('renderer-error')
export class RendererErrorMessage extends FromRendererMessage {
  constructor(
    public message: string,
    public context?: string
  ) {
    super()
  }
}

@FromRenderer('renderer-warn')
export class RendererWarnMessage extends FromRendererMessage {
  constructor(public context: string) {
    super()
  }
}

@FromRenderer('renderer-info')
export class RendererInfoMessage extends FromRendererMessage {
  constructor(public context: string) {
    super()
  }
}
export function bindElectronMessages(plugin: MainPlugin) {
  plugin.bindRoute(RendererErrorMessage)
  plugin.bindRoute(RendererWarnMessage)
  plugin.bindRoute(RendererInfoMessage)
}
