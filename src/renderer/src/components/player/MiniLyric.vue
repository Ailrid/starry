<template>
  <div
    ref="lyric-container"
    class="no-scrollbar h-full w-full overflow-y-auto scroll-smooth"
    :class="{
      'lyric-mask': lct.setting.mask
    }"
    @wheel.passive="lct.onWheel"
  >
    <div ref="lyric" class="flex w-full origin-center flex-col gap-10" :style="lct.paddingStyle">
      <div
        v-for="(line, index) in lct.lyric?.lyrics"
        :key="index"
        :class="[
          lct.currentIndex === index ? 'scale-100 opacity-100' : 'scale-80 opacity-50',
          lct.currentIndex !== index && lct.setting.lyricBlur ? 'blur-[1px]' : ''
        ]"
        class="group lyric-content ease-[cubic-bezier(0.22, 1, 0.36, 1)] relative flex w-full cursor-pointer flex-col items-start rounded-xl transition-all duration-700 hover:opacity-100 hover:blur-[0px]"
        @click="SeekTimeMessage.send(line.time)"
      >
        <!-- 歌词和翻译 -->
        <div class="w-full text-center text-xl font-medium">
          {{ line.text }}
        </div>
        <div v-if="line.trans" class="mt-3 w-full text-center font-medium opacity-80">
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

.lyric-content {
  text-shadow:
    0 4px 8px rgba(0, 0, 0, 0.4),
    0 0 4px rgba(0, 0, 0, 0.2);
}
</style>
