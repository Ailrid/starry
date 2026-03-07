<template>
  <div class="window" :class="stc.themeClasses" :style="stc.rootStyle">
    <!-- 图片背景 -->
    <div
      v-if="stc.setting.theme.mode === 'image'"
      class="image-bg -z-100"
      style="background-image: var(--bg-image); background-size: cover; background-position: center"
    ></div>
    <!-- 图片背景的遮罩，处理模糊程度和透明度 -->
    <div
      v-if="stc.setting.theme.mode === 'image'"
      :style="stc.maskStyle"
      class="image-bg -z-10"
    ></div>
    <Layout></Layout>
  </div>
</template>
<script setup lang="ts">
import Layout from '@/layouts/Layout.vue'
import { useController } from '@virid/vue'
import { SettingController } from '@/ccs/settings'
const stc = useController(SettingController)
</script>

<style lang="css">
@reference "@/assets/main.css";
.window {
  @apply bg-card flex h-screen w-full flex-col overflow-hidden border;
  color: var(--foreground);
}
.image-bg {
  @apply pointer-events-none absolute inset-0;
}
html,
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  user-select: none;
}
/* 滚动条整体轨道 */
::-webkit-scrollbar {
  width: 8px; /* 稍微窄一点更精致 */
  height: 8px;
}
/* 滚动条轨道 */
::-webkit-scrollbar-track {
  display: none;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  /* 使用你主题中的 muted-foreground (灰色文字色) */
  /* 在亮色模式下它是深灰，暗色下是浅灰，完美适配 */
  background: color-mix(in srgb, var(--muted-foreground), transparent 70%);

  border: 2px solid transparent;
  background-clip: padding-box;
  border-radius: 10px;
}
/* 悬停时，使用强调色 (primary) */
::-webkit-scrollbar-thumb:hover {
  /* 直接用你主题定义的 primary 橙色/黑色 */
  background: color-mix(in srgb, var(--primary), transparent 40%);
}
</style>
