<template>
  <div class="window">
    <!-- 图片背景 -->
    <div
      v-if="stc.setting.theme.mode === 'image'"
      class="image-bg z-0"
      style="background-image: var(--bg-image); background-size: cover; background-position: center"
    ></div>
    <div v-if="stc.setting.theme.mode === 'image'" class="image-bg z-1 backdrop-blur-md"></div>
    <div class="z-10">
      <TitleBarRight></TitleBarRight>
      <button @click="$router.back()">回退</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleBarRight from './titlebar/TitleBarRight.vue'
import { useController } from '@virid/vue'
import { SettingController } from '@/ccs/settings'
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
