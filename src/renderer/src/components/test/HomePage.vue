<template>
  <div>
    <button @click="hpct.changePlayingState()">{{ hpct.isPlaying ? '暂停' : '播放' }}</button>
    <button @click="hpct.goToPage({ name: 'other' })">otherPage</button>
    <button @click="hpct.goToPage({ name: 'playlist' })">playListPage</button>
    <RouterView v-slot="{ Component }">
      <Transition>
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useController } from '@/ccs/adapters/hooks'
import { HomePageConrtoller } from '@/logic/controllers/homePageController'
const hpct = useController(HomePageConrtoller)
</script>

<style lang="scss" scoped></style>
