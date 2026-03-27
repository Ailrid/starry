<template>
  <div class="grid h-full w-full grid-cols-2 gap-2 overflow-hidden p-12">
    <div
      class="image-bg z-0 shadow"
      :style="{
        backgroundImage: `url(${pct.currentSong?.album.cover + '?param=512y512'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }"
    ></div>
    <!-- 图片背景的遮罩，处理模糊程度和透明度 -->
    <div :style="pct.maskStyle" class="image-bg z-1"></div>
    <div class="z-10 h-full w-full"></div>
    <Lyric class="z-10"></Lyric>
  </div>
</template>

<script setup lang="ts">
import Lyric from '@/components/player/Lyric.vue'
import { useController } from '@virid/vue'
import { PlayerPageController } from './controllers'
const pct = useController(PlayerPageController)
</script>
<style scoped>
@reference "@/assets/main.css";
.image-bg {
  @apply pointer-events-none absolute inset-0;
}
.shadow {
  box-shadow:
    inset 5px 5px 20px 0px var(--cover-color),
    inset -5px -5px 20px 0px var(--cover-color);
}
</style>
