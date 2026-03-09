<template>
  <div class="group flex w-full flex-col">
    <div class="relative h-36 w-full overflow-hidden">
      <img
        v-if="cct.userProfile?.avatar"
        :src="cct.userProfile.avatar"
        class="h-full w-full object-cover object-top opacity-60 transition-transform duration-1000 group-hover:scale-105"
      />

      <div class="absolute inset-0 bg-white/10 backdrop-blur-xs"></div>

      <div
        class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
      ></div>
    </div>

    <div class="relative px-8 pb-8">
      <div class="absolute -top-10 left-8">
        <div class="rounded-full border-[4px] border-white bg-white shadow-xl shadow-slate-200/60">
          <img
            :src="cct.userProfile?.avatar"
            class="h-20 w-20 rounded-full object-cover transition-transform hover:rotate-6"
          />
        </div>
      </div>

      <div class="pt-14">
        <div class="flex items-center gap-3">
          <h3 class="text-2xl font-bold tracking-tight text-slate-800">
            {{ cct.userProfile?.nickname }}
          </h3>
          <span
            class="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-black text-slate-500 italic"
          >
            Lv.{{ cct.userProfile?.level }}
          </span>
        </div>
        <p class="mt-3 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-slate-500">
          {{ cct.userProfile?.signature || '音乐是灵魂的避风港...' }}
        </p>
      </div>

      <div
        class="mt-8 flex items-center justify-around rounded-2xl border border-slate-100 bg-slate-50/50 py-4"
      >
        <div class="flex flex-col items-center">
          <p class="text-lg font-bold text-slate-800">{{ cct.userProfile?.follows || 0 }}</p>
          <p class="text-xs font-medium text-slate-400">关注</p>
        </div>
        <div class="h-6 w-[1px] bg-slate-200"></div>
        <div class="flex flex-col items-center">
          <p class="text-lg font-bold text-slate-800">{{ cct.userProfile?.followeds || 0 }}</p>
          <p class="text-xs font-medium text-slate-400">粉丝</p>
        </div>
        <div class="h-6 w-[1px] bg-slate-200"></div>
        <div class="flex flex-col items-center">
          <p class="text-lg font-bold text-slate-800">{{ cct.userProfile?.listenSongs || 0 }}</p>
          <p class="text-xs font-medium text-slate-400">听歌</p>
        </div>
      </div>
    </div>

    <div
      class="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-8 py-5 backdrop-blur-sm"
    >
      <div class="flex items-center gap-2 text-xs font-medium text-slate-400">
        <div class="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
        已加入网易云 {{ cct.userProfile?.createDays || 0 }} 天
      </div>
      <Button
        variant="ghost"
        @click="LogoutMessage.send()"
        class="group/btn h-9 px-4 text-sm font-semibold text-slate-500 transition-all hover:bg-red-50 hover:text-red-600"
      >
        <i class="ri-logout-box-r-line mr-1 text-base"></i>
        退出登录
      </Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useController } from '@virid/vue'
import { LogoutMessage, UserController } from '@/ccs/user'
import { Button } from '../ui/button'
const cct = useController(UserController)
</script>

<style scoped>
/* 简单的入场动画，配合 LoginDialog 的 Transition */
.flex-col {
  animation: slide-up 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
