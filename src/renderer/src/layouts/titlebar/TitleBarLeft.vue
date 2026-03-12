<template>
  <div class="drag flex w-full items-center justify-between px-2">
    <div class="no-drag flex items-center gap-1">
      <LoginDialog class="h-10 w-10" />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <button
            class="flex h-8 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm font-medium transition-all outline-none active:scale-95"
            @wheel="TitleBarLeftControllerMessage.send($event)"
          >
            <span>{{ tct.currentViewName }}</span>
            <ChevronDownIcon :size="14" class="opacity-50" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          class="bg-card/50 w-48 border shadow-2xl backdrop-blur-3xl"
          :style="sct.rootStyle"
        >
          <DropdownMenuLabel class="text-foreground text-sm tracking-widest uppercase opacity-50"
            >Select View</DropdownMenuLabel
          >
          <DropdownMenuSeparator />

          <DropdownMenuItem
            @click="tct.changeView('current-playlist')"
            class="focus:bg-primary/10 text-foreground hover:text-foreground cursor-pointer"
          >
            <ListMusicIcon class="mr-2 h-4 w-4" /> 播放列表
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="tct.changeView('playlist-manager')"
            class="focus:bg-primary/10 text-foreground hover:text-foreground cursor-pointer"
          >
            <DiscIcon class="mr-2 h-4 w-4" /> 歌单列表
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="tct.changeView('recent-play')"
            class="focus:bg-primary/10 text-foreground hover:text-foreground cursor-pointer"
          >
            <HeartIcon class="mr-2 h-4 w-4" /> 最近播放
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div class="drag h-full flex-1"></div>
    <div class="no-drag flex items-center">
      <button
        type="button"
        class="group flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden transition-all duration-300 active:scale-75"
        @click="$router.push({ name: 'setting' })"
      >
        <SettingsIcon
          :size="18"
          :stroke-width="1.2"
          class="group-hover:text-primary transition-all duration-500 ease-out group-hover:scale-125 group-hover:rotate-180"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginDialog from '@/components/login/LoginDialog.vue'
import { SettingsIcon, ChevronDownIcon, ListMusicIcon, DiscIcon, HeartIcon } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useController } from '@virid/vue'
import { SettingController } from '@/ccs/settings'
import { TitleBarLeftController, TitleBarLeftControllerMessage } from '../controllers'
const sct = useController(SettingController)
const tct = useController(TitleBarLeftController, {
  id: 'title-bar-left'
})
</script>

<style>
.drag {
  -webkit-app-region: drag;
}
.no-drag {
  -webkit-app-region: no-drag;
}
</style>
