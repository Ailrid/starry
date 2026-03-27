<template>
  <div
    ref="container"
    class="no-scrollbar lyric-mask h-full w-full overflow-y-auto scroll-smooth pr-4 pl-4"
    @wheel.passive="lct.onWheel"
  >
    <div ref="lyric" class="lyric-text flex w-full flex-col gap-10" :style="lct.paddingStyle">
      <div
        v-for="(line, index) in lct.lyric?.lyrics"
        :key="index"
        :class="[
          lct.currentIndex === index
            ? 'translate-x-4 scale-100 opacity-100'
            : 'scale-80 opacity-50 blur-[1px]'
        ]"
        class="group lyric-content relative flex w-full origin-left cursor-pointer flex-col items-start rounded-xl transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-4 hover:opacity-100 hover:blur-[0px]"
        @click="SeekTimeMessage.send(line.time)"
      >
        <!-- 横虚线 -->
        <div
          class="pointer-events-none absolute inset-0 flex opacity-0 transition-opacity duration-100 group-hover:opacity-100"
          :class="[line.trans ? 'items-center' : 'items-end']"
        >
          <div class="arrow ml-[-20px] border-y-[6px] border-l-[1rem] border-y-transparent"></div>
          <div class="dash mx-4 h-[2px] flex-1 border-t border-dashed"></div>
          <span class="mr-4 font-mono text-sm">
            {{ formatTime(line.time) }}
          </span>
        </div>
        <!-- 歌词和翻译 -->
        <div class="text-3xl leading-snug font-medium tracking-tighter">
          {{ line.text }}
        </div>
        <div v-if="line.trans" class="mt-3 text-2xl font-medium">
          {{ line.trans }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useController } from '@virid/vue'
import { LyricController } from './controllers'
import { SeekTimeMessage } from '@/ccs/playback'
import { formatTime } from '@/utils'
const lct = useController(LyricController)
</script>

<style scoped>
.lyric-mask {
  mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 15%,
    black 85%,
    transparent 100%
  );
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.lyric-text {
  color: var(--cover-color);
}

.lyric-content {
  text-shadow:
    0 4px 12px rgba(0, 0, 0, 0.5),
    0 0 4px rgba(0, 0, 0, 0.2);
}

.dash {
  border-bottom: 1px dashed var(--cover-color);
}
.arrow {
  border-left-color: var(--cover-color);
}
</style>
