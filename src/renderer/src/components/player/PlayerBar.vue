<template>
  <div
    ref="player"
    class="bg-card z-50 flex h-20 w-full items-center backdrop-blur-xl"
    @dblclick.stop="PlayerControllerMessage.send($event, false)"
  >
    <PlayerCard class="h-20 w-64" />
    <div class="flex-1" @dblclick.stop="PlayerControllerMessage.send($event, true)"></div>
    <Slider class="h-8" />
    <div class="flex-1" @dblclick.stop="PlayerControllerMessage.send($event, true)"></div>
    <PlayerButton />
  </div>
</template>
<script lang="ts" setup>
import PlayerCard from './PlayerCard.vue'
import Slider from './Slider.vue'
import PlayerButton from './PlayerButton.vue'
import { useController } from '@virid/vue'
import { PlayerBarController, PlayerControllerMessage } from './controllers'
useController(PlayerBarController)
</script>
