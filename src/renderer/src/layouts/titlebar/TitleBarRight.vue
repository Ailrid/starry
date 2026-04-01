<template>
  <div class="drag z-50 flex w-full items-center justify-between px-2">
    <div class="no-drag flex items-center">
      <button
        class="hover:text-primary flex h-10 w-10 cursor-pointer items-center justify-center transition-colors active:opacity-50"
        @click="$router.go(-1)"
      >
        <ArrowLeft :size="18" :stroke-width="1.2" />
      </button>

      <button
        class="hover:text-primary flex h-10 w-10 cursor-pointer items-center justify-center transition-colors active:opacity-50"
        @click="$router.go(1)"
      >
        <ArrowRight :size="18" :stroke-width="1.2" />
      </button>
    </div>
    <div class="h-full flex-1"></div>
    <div class="no-drag flex items-center">
      <button
        class="hover:text-primary flex h-10 w-10 cursor-pointer items-center justify-center transition-colors active:opacity-50"
        @click="MinimizeWindowMessage.send()"
      >
        <Minus :size="16" :stroke-width="1.2" />
      </button>

      <button
        class="hover:text-primary flex h-10 w-10 cursor-pointer items-center justify-center transition-colors active:opacity-50"
        @click="MaximizeWindowMessage.send()"
      >
        <Square :size="14" :stroke-width="1.2" />
      </button>

      <button
        class="hover:text-primary flex h-10 w-10 cursor-pointer items-center justify-center transition-colors active:opacity-50"
        @click="BackupPlaybackMessage.send()"
      >
        <X :size="18" :stroke-width="1.2" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Minus, Square, X, ArrowLeft, ArrowRight } from 'lucide-vue-next'
import { BackupPlaybackMessage, MinimizeWindowMessage, MaximizeWindowMessage } from '@/ccs/electron'
</script>

<style scoped>
.drag {
  -webkit-app-region: drag;
}
.no-drag {
  -webkit-app-region: no-drag;
}
</style>
