<template>
  <div class="flex h-full w-full overflow-hidden p-12 pr-32 pl-32">
    <div v-if="pct.setting.coverBackground" class="absolute inset-0 z-0 overflow-hidden">
      <Transition name="bg-fade">
        <div
          :key="pct.currentSong?.album.cover"
          class="image-bg absolute inset-0"
          :style="{
            backgroundImage: `url(${pct.currentSong?.album.cover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }"
        ></div>
      </Transition>
    </div>
    <!-- 图片背景的遮罩，处理模糊程度和透明度 -->
    <div v-if="pct.setting.coverBackground" :style="pct.maskStyle" class="image-bg z-1"></div>
    <div v-if="pct.setting.coverBackground" class="image-bg z-100 shadow"></div>
    <div class="z-10 flex h-full w-[35%]">
      <Transition name="fade" mode="out-in">
        <component :is="componentsMap[pct.currentView]" />
      </Transition>
    </div>
    <Lyric class="z-10 flex-1 pl-32" />
  </div>
</template>

<script setup lang="ts">
import Lyric from '@/components/player/Lyric.vue'
import { useController } from '@virid/vue'
import { PlayerPageController } from './controllers'
import PlayerConfig from '@/components/player/PlayerConfig.vue'
import PlayerInfo from '@/components/player/PlayerInfo.vue'
const pct = useController(PlayerPageController)
const componentsMap = {
  'player-info': PlayerInfo,
  'player-config': PlayerConfig
}
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
  opacity: 0.8;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: opacity 1.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.bg-fade-leave-active {
  position: absolute;
}

.bg-fade-enter-from,
.bg-fade-leave-to {
  opacity: 0;
}
</style>
