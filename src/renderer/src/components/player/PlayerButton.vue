<template>
  <div class="flex items-center gap-2 px-6">
    <Button
      variant="ghost"
      size="icon"
      class="group/like h-9 w-9 rounded-full transition-all"
      :class="pct.currentSong?.like ? 'text-primary' : 'opacity-50 hover:opacity-100'"
      @click="SongLikeMessage.send()"
    >
      <Heart
        :size="18"
        :class="{ 'fill-current': pct.currentSong?.like }"
        class="transition-transform group-active/like:scale-75"
      />
    </Button>

    <!-- <Button
      variant="ghost"
      size="icon"
      class="h-9 w-9 rounded-full transition-all"
      :class="pct.isDesktopLyricOpen ? 'text-primary' : 'opacity-50 hover:opacity-100'"
      @click="pct.toggleDesktopLyric()"
    >
      <Music2 :size="18" />
    </Button> -->

    <Popover>
      <PopoverTrigger as-child>
        <Button
          variant="ghost"
          size="icon"
          class="h-9 w-9 rounded-full opacity-50 transition-all hover:opacity-100"
        >
          <Volume2 v-if="pct.volume > 0" :size="18" />
          <VolumeX v-else :size="18" class="text-destructive" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        :side-offset="20"
        class="border-border/40 bg-card/60 w-12 rounded-2xl p-3 shadow-2xl backdrop-blur-xl"
      >
        <div class="flex h-32 flex-col items-center justify-between">
          <span class="font-mono text-[10px] font-bold opacity-40">{{ pct.volume }}</span>

          <div
            ref="volumeBar"
            class="bg-secondary/50 relative w-1.5 flex-1 cursor-pointer overflow-hidden rounded-full"
            @mousedown="pct.onVolumeMouseDown($event)"
          >
            <div
              class="bg-primary absolute bottom-0 w-full transition-all duration-75"
              :style="{ height: `${pct.volume}%` }"
            >
              <div
                class="absolute top-0 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              ></div>
            </div>
          </div>

          <div class="bg-primary/20 mt-1 h-1 w-1 rounded-full"></div>
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Heart, Volume2, VolumeX } from 'lucide-vue-next'
import { useController } from '@virid/vue'
import { PlayerButtonController } from './controllers'
import { SongLikeMessage } from '@/ccs/playback'

const pct = useController(PlayerButtonController)
</script>
