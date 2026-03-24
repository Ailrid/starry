import { Responsive, Env, Use } from '@virid/vue'
import { BaseMessage, Controller, type Newable, MessageWriter } from '@virid/core'
import { useTemplateRef, type ShallowRef } from 'vue'
@Controller()
export class ScrubberController {
  @Env()
  public pageIndex!: number
  @Env()
  public maxPageLength!: number
  @Env()
  public messageType!: Newable<BaseMessage>

  @Responsive()
  public isDragging: boolean = false
  public rafId: number | null = null
  @Use(() => useTemplateRef('scrubber'))
  public scrubberRef!: ShallowRef<HTMLDivElement | null>

  getTickStyle(index: number) {
    const diff = Math.abs(index - this.pageIndex)
    let width = 4
    let height = 2
    let opacity = 0.2
    let backgroundColor = 'var(--foreground)'

    if (diff === 0) {
      width = 24
      height = 6
      opacity = 1
      backgroundColor = 'var(--primary)'
    } else if (diff === 1) {
      width = 12
      height = 3
      opacity = 0.5
    } else if (diff === 2) {
      width = 8
      height = 2
      opacity = 0.3
    }

    return {
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor,
      opacity,
      borderRadius: '999px',
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }
  }
  updateValue(clientY: number) {
    if (!this.scrubberRef.value) return

    const rect = this.scrubberRef.value.getBoundingClientRect()
    const relativeY = clientY - rect.top

    let target = Math.round((relativeY / rect.height) * (this.maxPageLength + 1)) - 1
    // 边界约束
    target = Math.max(0, Math.min(this.maxPageLength - 1, target))
    if (target !== this.pageIndex) {
      MessageWriter.write(new this.messageType(target))
    }
  }
  handleMouseDown(e: MouseEvent) {
    this.isDragging = true
    this.updateValue(e.clientY)
  }

  handleMouseMove(e: MouseEvent) {
    if (!this.isDragging) return

    // 简单的节流，防止高频触发更新
    if (this.rafId) return
    this.rafId = window.requestAnimationFrame(() => {
      this.updateValue(e.clientY)
      this.rafId = null
    })
  }
}
