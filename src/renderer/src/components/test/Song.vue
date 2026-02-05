<template>
  <div>
    <div>歌曲名称</div>
    <div>{{ sct.song ? sct.song.name : '未知' }}</div>
    <button @click="sct.playThisSong()">播放</button>
  </div>
</template>

<script setup lang="ts">
import { useController } from '@/ccs/adapters/hooks'
import { SongController } from '@/logic/controllers/songController'
const sct = useController(SongController)
</script>

<style lang="scss" scoped></style>
