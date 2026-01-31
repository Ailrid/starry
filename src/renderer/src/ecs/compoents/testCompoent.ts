import { reactive, ref } from 'vue'
import { injectable } from 'inversify'

@injectable()
export class TestCompoent {
  // 响应式状态
  public counter = ref(0)

  public state = reactive({
    name: 'Default Track',
    isPlaying: false,
    volume: 0.8
  })
}
