<template>
  <div class="h-full w-full">
    <Transition name="fade" mode="out-in">
      <component :is="CurrentPlaylist" v-if="sct.currentView == 'current-playlist'" />
      <component :is="PlaylistManager" v-if="sct.currentView == 'playlist-manager'" />
      <component :is="RecentPlay" v-if="sct.currentView == 'recent-play'" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import CurrentPlaylist from './CurrentPlaylist.vue'
import PlaylistManager from './PlaylistManager.vue'
import RecentPlay from './RecentPlay.vue'
import { useController } from '@virid/vue'
import { SideBarController } from './controllers'
const sct = useController(SideBarController)
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
