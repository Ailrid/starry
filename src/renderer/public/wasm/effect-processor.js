import { initSync, AudioKernel, PipelineParams } from './pkg/audio.js'

class RustEffectProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super(options)
    this.kernel = null
    this.wasmMemory = null
    const wasmModule = options.processorOptions.wasmModule
    const rs = options.processorOptions.rs
    if (wasmModule) {
      const exports = initSync(wasmModule)
      this.wasmMemory = exports.memory
      this.kernel = AudioKernel.new(rs)
      this.port.onmessage = event => {
        if (event.data.type == 'get_params') {
          this.isByPass = event.data.value
          // 发回参数
          this.port.postMessage({
            type: 'get_params',
            params: this.kernel.get_params()
          })
        } else if (event.data.type == 'set_params') {
          const newParams = PipelineParams.new(
            event.data.params.bass_switch,
            event.data.params.crystallization_switch,
            event.data.params.stereo_switch,
            event.data.params.limiter_switch,
            event.data.params.bass_gain,
            event.data.params.crystallization_amount
          )

          this.kernel.set_params(newParams)
        } else {
          console.error('[AudioWorkletProcessor] Unknown Message Type', event.data.type)
        }
      }
    } else {
      console.error('[AudioWorkletProcessor] No Wasm Module Found')
    }
  }

  process(inputs, outputs) {
    const input = inputs[0]
    const output = outputs[0]

    // 检查 kernel 和内存是否准备就绪
    if (!this.kernel || !input[0]) {
      for (let ch = 0; ch < output.length; ch++) {
        output[ch].set(input[ch])
      }
      return true
    }

    const heap = this.wasmMemory.buffer
    // 写入左右声道
    const inL = new Float32Array(heap, this.kernel.in_l_ptr(), 128)
    inL.set(input[0])
    const inR = new Float32Array(heap, this.kernel.in_r_ptr(), 128)
    inR.set(input[1])

    // 运行 Rust音频处理
    this.kernel.process()

    // 读出数据
    output[0].set(new Float32Array(heap, this.kernel.out_l_ptr(), 128))
    if (output[1]) {
      output[1].set(new Float32Array(heap, this.kernel.out_r_ptr(), 128))
    }

    return true
  }
}
registerProcessor('rust-effect-processor', RustEffectProcessor)
