<template>
  <div class="drag z-50 flex w-full items-center justify-between px-2">
    <div class="no-drag flex items-center">
      <Button
        variant="icon"
        class="hover:text-primary h-10 w-10 active:opacity-50"
        @click="$router.go(-1)"
      >
        <ArrowLeft :size="18" :stroke-width="1.2" />
      </Button>

      <Button
        variant="icon"
        class="hover:text-primary h-10 w-10 active:opacity-50"
        @click="$router.go(1)"
      >
        <ArrowRight :size="18" :stroke-width="1.2" />
      </Button>
    </div>
    <div class="h-full flex-1"></div>
    <div class="no-drag relative flex h-full w-60 items-center">
      <!-- Search input -->
      <div
        class="border-foreground/10 bg-primary/0 focus-within:border-primary focus-within:bg-primary/10 relative flex w-full items-center rounded-md border px-2.5 py-1 transition-colors duration-200 ease-in-out"
      >
        <Search class="text-foreground h-4 w-4 shrink-0" />
        <input
          type="text"
          v-model="tct.searchText"
          @focus="tct.isSearchFocused = true"
          @blur="hiddenSuggest"
          class="placeholder:text-foreground/50 text-foreground selection:bg-primary/20 selection:text-foreground w-full bg-transparent px-2 text-sm outline-none"
          @keydown.enter="$router.push({ name: 'search', params: { keywords: tct.searchText } })"
        />

        <button
          v-if="tct.searchText"
          @mousedown.prevent
          @click="tct.searchText = ''"
          type="button"
          class="text-foreground/60 hover:text-foreground flex shrink-0 items-center justify-center rounded-full p-0.5 transition-colors duration-150"
        >
          <X class="h-3.5 w-3.5" />
        </button>
      </div>
      <!-- Search Suggest -->
      <div
        v-if="tct.searchSuggest?.result && tct.isSearchFocused"
        class="bg-card/95 border-foreground/10 absolute top-full left-0 z-50 mt-1.5 max-h-96 w-80 overflow-y-auto rounded-xl border p-1.5 shadow-xl backdrop-blur-md"
      >
        <!-- Songs Category -->
        <div v-if="tct.searchSuggest.result.songs?.length" class="mb-2">
          <!-- Section header -->
          <div class="text-foreground/40 px-2.5 py-1 text-xs font-medium">单曲</div>
          <!-- Songs item list -->
          <div
            v-for="item in tct.searchSuggest.result.songs"
            :key="item.id"
            class="hover:bg-primary/10 flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 transition-colors"
            @click="PlaySongMessage.send(item)"
          >
            <div class="text-foreground truncate text-sm font-medium">
              {{ item.name }}
            </div>
            <div class="text-foreground/50 ml-2 shrink-0 truncate text-xs">
              {{ item.artists?.[0]?.name }}
            </div>
          </div>
        </div>

        <!-- Artists Category -->
        <div v-if="tct.searchSuggest.result.artists?.length" class="mb-2">
          <!-- Section header -->
          <div class="text-foreground/40 px-2.5 py-1 text-xs font-medium">歌手</div>
          <!-- Artists item list -->
          <div
            v-for="item in tct.searchSuggest.result.artists"
            :key="item.id"
            class="hover:bg-primary/10 flex cursor-pointer items-center rounded-md px-2.5 py-1.5 transition-colors"
            @click="$router.push({ name: 'artist', params: { id: item.id } })"
          >
            <div class="text-foreground truncate text-sm font-medium">
              {{ item.name }}
            </div>
          </div>
        </div>

        <!-- Albums Category -->
        <div v-if="tct.searchSuggest.result.albums?.length" class="mb-2">
          <!-- Section header -->
          <div class="text-foreground/40 px-2.5 py-1 text-xs font-medium">专辑</div>

          <!-- Albums item list -->
          <div
            v-for="item in tct.searchSuggest.result.albums"
            :key="item.id"
            class="hover:bg-primary/10 flex cursor-pointer items-center justify-between rounded-md px-2.5 py-1.5 transition-colors"
            @click="$router.push({ name: 'album', params: { id: item.id } })"
          >
            <div class="text-foreground truncate text-sm font-medium">
              {{ item.name }}
            </div>
            <div class="text-foreground/50 ml-2 shrink-0 truncate text-xs">
              {{ item.artists?.[0]?.name }}
            </div>
          </div>
        </div>

        <!-- Playlists Category -->
        <div v-if="tct.searchSuggest.result.playlists?.length">
          <!-- Section header -->
          <div class="text-foreground/40 px-2.5 py-1 text-xs font-medium">歌单</div>
          <!-- Playlists item list -->
          <div
            v-for="item in tct.searchSuggest.result.playlists"
            :key="item.id"
            class="hover:bg-primary/10 flex cursor-pointer items-center rounded-md px-2.5 py-1.5 transition-colors"
            @click="$router.push({ name: 'playlist', params: { id: item.id } })"
          >
            <div class="text-foreground truncate text-sm font-medium">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-full flex-1"></div>
    <div class="no-drag flex items-center">
      <Button
        variant="icon"
        class="hover:text-primary h-10 w-10 active:opacity-50"
        @click="MinimizeWindowMessage.send()"
      >
        <Minus :size="16" :stroke-width="1.2" />
      </Button>

      <Button
        variant="icon"
        class="hover:text-primary h-10 w-10 active:opacity-50"
        @click="MaximizeWindowMessage.send()"
      >
        <Square :size="14" :stroke-width="1.2" />
      </Button>

      <Button
        variant="icon"
        class="hover:text-primary h-10 w-10 active:opacity-50"
        @click="HiddenWindowMessage.send()"
      >
        <X :size="18" :stroke-width="1.2" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { Minus, Square, X, ArrowLeft, ArrowRight, Search } from 'lucide-vue-next'
import { HiddenWindowMessage, MinimizeWindowMessage, MaximizeWindowMessage } from '@/ccs/electron'
import { TitleBarRightController } from '@/layouts/controllers/'
import { useController } from '@virid/vue'
import { PlaySongMessage } from '@/ccs/playback'
const tct = useController(TitleBarRightController)

const hiddenSuggest = () => {
  setTimeout(() => {
    tct.isSearchFocused = false
  }, 100)
}
</script>

<style scoped>
.drag {
  -webkit-app-region: drag;
}
.no-drag {
  -webkit-app-region: no-drag;
}
</style>
