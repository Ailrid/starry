<template>
  <div
    class="group/track relative h-full w-8 cursor-ns-resize overflow-hidden rounded-full transition-all duration-300 select-none"
    @mousedown="sct.handleMouseDown($event)"
    @mousemove="sct.handleMouseMove($event)"
    @mouseleave="sct.isDragging = false"
    @mouseup="sct.isDragging = false"
    ref="scrubber"
  >
    <div class="bg-foreground/5 absolute top-0 left-1/2 h-full w-px -translate-x-1/2" />

    <div class="flex h-full flex-col justify-between py-8">
      <div
        v-for="(_, index) in maxPageLength"
        :key="index"
        class="relative flex flex-1 items-center justify-center"
      >
        <div
          class="transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          :style="sct.getTickStyle(index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useController } from '@virid/vue'
import { ScrubberController } from './controllers'
import { type Newable, type BaseMessage } from '@virid/core'
const props = defineProps<{
  pageIndex: number
  maxPageLength: number
  messageType: Newable<BaseMessage>
}>()
const sct = useController(ScrubberController, {
  context: props
})
</script>
