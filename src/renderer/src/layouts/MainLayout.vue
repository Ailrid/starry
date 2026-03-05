<template>
  <div class="flex h-screen w-full flex-col bg-muted overflow-hidden">
    <div class="flex flex-1 overflow-hidden">
      <aside
        class="backdrop-blur-xl flex w-64 flex-col bg-sidebar overflow-hidden shadow-[4px_0_24px_rgba(0,0,0,0.05)] z-10"
      >
        <TitleBarLeft class="h-12 shrink-0" />
        <div class="flex-1 overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      <main class="flex flex-1 flex-col bg-background overflow-hidden">
        <TitleBarRight class="h-12 shrink-0" />
        <div class="flex-1 overflow-y-auto">
          <RouterView />
        </div>
      </main>
    </div>

    <div
      class="backdrop-blur-xl h-20 bg-card overflow-hidden shrink-0 shadow-[0_-4px_24px_rgba(0,0,0,0.05)] z-100"
    >
      <Player />
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleBarLeft from './titlebar/TitleBarLeft.vue'
import TitleBarRight from './titlebar/TitleBarRight.vue'
import Sidebar from '@components/sidebar/SideBar.vue'
import Player from '@components/player/Player.vue'
</script>

<style lang="scss" scoped></style>
