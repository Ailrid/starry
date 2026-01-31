import { TestCompoent } from '@/ecs/compoents/testCompoent'
import { injectable } from 'inversify'
import { Watch, Computed, System, Event } from '@/core/decorator'
import log from 'electron-log/renderer'
import { BaseMessage, MessageReader } from '@/core/message'
export class TestMessage extends BaseMessage {}

export class TestSystem {
  @System
  static increaseVoloum(
    @Event(TestMessage) messageReader: MessageReader<TestMessage>,
    test: TestCompoent
  ) {
    console.log('MessageReader 读取到的消息:', messageReader.read())
    test.state.volume += 10
  }
}

@injectable()
export class TestController {
  constructor(private service: TestCompoent) {}
  @Computed
  get volume() {
    return `${Math.round(this.service.state.volume * 100)}%`
  }

  @Watch((i) => i.service.state.volume, { immediate: true })
  public test() {
    log.info('volume:', this.service.state.volume)
  }
  onMounted() {
    log.info('TestController 挂载成功，Service 自动注入！')
  }
}
