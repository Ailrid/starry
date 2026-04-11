<template>
  <div class="flex h-full w-full flex-col justify-between gap-2 p-2 pb-7">
    <div class="flex flex-col gap-5 p-2">
      <div
        v-for="(item, index) in functions"
        :key="item.name"
        class="group relative flex w-full cursor-pointer items-center gap-4 pb-3 transition-all duration-500 hover:translate-x-2"
        @click="item.onClick"
      >
        <span class="group-hover:text-primary font-bold tracking-widest transition-colors">
          {{ String(index + 1).padStart(2, '0') }}
        </span>
        <Button variant="none" class="relative flex items-center gap-3">
          <component
            :is="item.component"
            class="group-hover:text-primary h-5 w-5 transition-all duration-500 group-hover:scale-110"
          />
        </Button>

        <div class="flex-1">
          <span
            class="group-hover:text-primary inline-block tracking-tight transition-all duration-500 group-hover:translate-x-1"
          >
            {{ item.name }}
          </span>
        </div>

        <div class="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden rounded-full">
          <div
            class="absolute inset-0 w-full transition-opacity duration-500 ease-in-out group-hover:opacity-0"
            style="
              background: linear-gradient(to right, var(--foreground), transparent);
              opacity: 0.1;
            "
          ></div>

          <div
            class="absolute inset-0 w-full -translate-x-4 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100"
            style="background: linear-gradient(to right, var(--primary), transparent)"
          ></div>
        </div>
      </div>
    </div>
    <!-- 迷你桌面歌词 -->
    <div class="h-64 w-full p-4">
      <MiniLyric size="small" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { House, Play, User, Download, Type } from 'lucide-vue-next'
import Button from '../ui/Button.vue'
import MiniLyric from '../player/MiniLyric.vue'
import { useController } from '@virid/vue'
import { MenuAreaController } from './controllers'
const mct = useController(MenuAreaController)
const functions = [
  {
    component: House,
    name: '返回主页',
    onClick: () => {
      mct.goHome()
    }
  },
  {
    component: Play,
    name: '播放页面',
    onClick: () => {
      mct.goPlayer()
    }
  },
  {
    component: User,
    name: '账户详情',
    onClick: () => {
      mct.goAccount()
    }
  },
  {
    component: Download,
    name: '下载页面',
    onClick: () => {
      mct.goDownload()
    }
  },
  {
    component: Type,
    name: '桌面歌词',
    onClick: () => {
      mct.goDeskLyric()
    }
  }
]
</script>
<style scoped>
@reference "@/assets/main.css";
.menu-item {
  @apply bg-card/20 group-hover:bg-primary/30 group-hover:shadow-primary/20 flex h-full w-full items-center justify-center rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-300 group-hover:shadow-2xl;
}
</style>
