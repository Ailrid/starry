<template>
  <div class="window" :class="stc.themeClasses" :style="stc.rootStyle">
    <!-- 图片背景 -->
    <div
      v-if="stc.setting.theme.mode === 'image'"
      class="image-bg z-0"
      style="background-image: var(--bg-image); background-size: cover; background-position: center"
    ></div>
    <!-- 图片背景的遮罩，处理模糊程度和透明度 -->
    <div
      v-if="stc.setting.theme.mode === 'image'"
      :style="stc.maskStyle"
      class="image-bg z-1"
    ></div>
    <!-- 侧边栏 -->
    <div class="z-10 flex flex-1 overflow-hidden">
      <aside class="side-bar flex w-64 flex-col">
        <TitleBarLeft class="h-12 shrink-0" />
        <div class="flex flex-1 flex-col overflow-hidden">
          <Sidebar class="h-full" />
        </div>
      </aside>

      <main class="bg-background flex flex-1 flex-col overflow-hidden">
        <TitleBarRight class="h-12 shrink-0" />
        <div class="flex flex-1 flex-col overflow-hidden">
          <RouterView />
        </div>
      </main>
    </div>
    <!-- 底部播放条 -->
    <div class="player">
      <Player />
    </div>
  </div>
</template>
<script setup lang="ts">
import TitleBarLeft from './titlebar/TitleBarLeft.vue'
import TitleBarRight from './titlebar/TitleBarRight.vue'
import Sidebar from '@components/sidebar/SideBar.vue'
import Player from '@components/player/Player.vue'
import { useController } from '@virid/vue'
import { SettingController } from '@/ccs/settings'
const stc = useController(SettingController)
</script>

<style scoped>
@reference "@/assets/main.css";
.window {
  @apply flex h-screen w-full flex-col overflow-hidden border;
}
.image-bg {
  @apply pointer-events-none absolute inset-0;
}
.side-bar {
  @apply bg-sidebar z-10 overflow-hidden border-r border-black/5 shadow-[4px_0_24px_rgba(0,0,0,0.05)] backdrop-blur-xl dark:border-white/10 dark:shadow-none;
}
.player {
  @apply bg-card z-50 h-20 shrink-0 overflow-hidden border-t border-black/5 shadow-[0_-4px_24px_rgba(0,0,0,0.05)] backdrop-blur-xl dark:border-white/10 dark:shadow-none;
}
</style>
