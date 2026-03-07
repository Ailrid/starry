<template>
  <div class="flex items-center">
    <span class="time-text">{{ sct.currentTime }}</span>
    <div
      ref="sliderContainer"
      class="group relative flex cursor-pointer items-center"
      @mousedown="SliderControllerMessage.send($event)"
    >
      <div class="flex items-center justify-center gap-1">
        <div
          v-for="(val, i) in sct.slider"
          :key="i"
          class="wave-bar"
          :class="[
            sct.sliderMask[i]
              ? 'scale-y-100 opacity-100 shadow-[0_0_15px_rgba(var(--primary-rgb),0.6)]'
              : 'bg-primary scale-y-75 opacity-50'
          ]"
          :style="{
            height: `${val * 1.5 + 0.5}rem`
          }"
        ></div>
      </div>
    </div>
    <span class="time-text">{{
      sct.player.duration ? formatTime(sct.player.duration) : '00:00'
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { useController } from '@virid/vue'
import { SliderController, SliderControllerMessage, formatTime } from './controllers'
const sct = useController(SliderController)
</script>
<style scoped>
@reference "@assets/main.css";
.wave-bar {
  @apply bg-primary shrink-0 rounded-full transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] will-change-[height,opacity,transform] hover:z-10 hover:scale-x-110 hover:scale-y-125 hover:opacity-100 hover:brightness-150;
  width: 0.4rem;
}
.time-text {
  font-size: 0.8rem;
  opacity: 0.8;
  @apply p-4;
}
</style>
