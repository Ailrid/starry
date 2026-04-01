import { EventMessage } from '@virid/core'
export class BootStrapElectronMessage extends EventMessage {}

export class InitStarryMessage extends EventMessage {
  constructor(public port: number) {
    super()
  }
}

export class RegisterProtocolMessage extends EventMessage {}
