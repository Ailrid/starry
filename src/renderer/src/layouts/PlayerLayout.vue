<template>
  <div class="window">
    <!-- 图片背景 -->
    <div
      v-if="stc.setting.theme.mode === 'image'"
      class="image-bg z-0"
      style="background-image: var(--bg-image); background-size: cover; background-position: center"
    ></div>
    <div v-if="stc.setting.theme.mode === 'image'" class="image-bg z-1 backdrop-blur-md"></div>
    <div class="relative z-10 flex h-full w-full">
      <TitleBarRight class="absolute h-12 w-full"></TitleBarRight>
      <Player class="h-full w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleBarRight from './titlebar/TitleBarRight.vue'
import { useController } from '@virid/vue'
import { SettingController } from '@/ccs/settings'
import Player from '@/pages/Player.vue'
const stc = useController(SettingController)
</script>

<style scoped>
@reference "@/assets/main.css";
.window {
  @apply bg-card flex h-screen w-full flex-col overflow-hidden border-0;
  color: var(--foreground);
}
.image-bg {
  @apply pointer-events-none absolute inset-0;
}
</style>
