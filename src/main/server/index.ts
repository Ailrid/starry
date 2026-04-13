export * from './express'
export * from './cache'

import { System, MessageWriter, Message, EventMessage } from '@virid/core'
import { server } from './express'

export class InitServerMessage extends EventMessage {
  constructor(public port: number) {
    super()
  }
}
export class ServerInitializedMessage extends EventMessage {}
export class InitServerSystem {
  /*
   * 启动服务器
   */
  @System({
    priority: 999
  })
  static initExpress(@Message(InitServerMessage) message: InitServerMessage) {
    server.listen(message.port, 'localhost', () => {
      //express已启动，开始创建窗口
      ServerInitializedMessage.send()
      MessageWriter.info(
        `[InitServerSystem] Bootstrap: Server listening on localhost:${message.port}`
      )
    })
  }
}
