<template>
  <div class="h-full w-full">
    <VirtualList :buffer="3" :list-data="cct.currentList" :item-height="64" :key-field="'id'">
      <template #item="{ item }">
        <div>
          <div>
            <img :src="item.album.cover + '?param=64y64'" alt="" />
          </div>
          <div>
            <div>{{ item.name }}</div>
            <div>{{ item.artists[0].name }}</div>
          </div>
        </div>
      </template>
    </VirtualList>
  </div>
</template>

<script setup lang="ts">
import VirtualList from '../public/VirtualList.vue'
import { CurrentPlaylistController } from './controllers'
import { useController } from '@virid/vue'
const cct = useController(CurrentPlaylistController)
</script>
