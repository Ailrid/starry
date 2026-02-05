<template>
  <div>
    <div>这是一个歌单页面，有很多首歌</div>
    <div v-for="(item, index) in plct.playlist" :key="item.id">
      <Song :index="index"></Song>
    </div>
  </div>
</template>

<script setup lang="ts">
import Song from './Song.vue'
import { useController } from '@/ccs/adapters/hooks'
import { PlaylistController } from '@/logic/controllers/playListController'
const plct = useController(PlaylistController, { id: 'playlist' })
</script>

<style lang="scss" scoped></style>
