<template>
  <div class="window">
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
    <div v-if="stc.setting.theme.mode === 'image'" class="image-bg z-1 backdrop-blur-md"></div>
    <div class="relative z-10 flex h-full w-full flex-col">
      <TitleBarRight class="h-12 w-full absolute z-50"></TitleBarRight>
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.fullPath" />
      </router-view>
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
