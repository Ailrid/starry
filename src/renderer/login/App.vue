<template>
  <div class="window">
    <LoginDialog></LoginDialog>
  </div>
</template>
<script setup lang="ts">
import LoginDialog from './components/LoginDialog.vue'
</script>

<style lang="css">
@reference "@/assets/main.css";
.window {
  @apply bg-card flex h-screen w-full flex-col overflow-hidden;
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
  width: 8px;
  height: 8px;
}
/* 滚动条轨道 */
::-webkit-scrollbar-track {
  display: none;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--primary), transparent 70%);

  border: 2px solid transparent;
  background-clip: padding-box;
  border-radius: 10px;
}

</style>
