import { Container } from 'inversify'
import { TestCompoent } from '@/ecs/compoents/testCompoent'
import { TestController } from '@/ecs/systems/testSystem'

const container = new Container()

// 绑定单例
container.bind(TestCompoent).toSelf().inSingletonScope()
// 绑定控制器
container.bind<TestController>(TestController).toSelf()

export { container }
