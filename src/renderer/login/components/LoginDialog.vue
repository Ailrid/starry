<template>
  <div class="relative flex h-full w-full flex-col border">
    <TitleBar></TitleBar>
    <Transition name="fade-slide" mode="out-in">
      <div class="flex flex-1 flex-col">
        <!-- 未登陆要显示登录方式 -->
        <div class="px-8 pt-10 pb-4">
          <QrLogin v-if="lct.currentLoginMode === 'qr'" />
          <WindowLogin v-else />
        </div>
      </div>
    </Transition>
    <div class="flex justify-center py-4">
      <Button
        variant="none"
        @click="lct.currentLoginMode = lct.currentLoginMode === 'qr' ? 'window' : 'qr'"
        class="hover:text-primary text-xs font-medium transition-colors"
      >
        {{ lct.switchText }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { useController } from '@virid/vue'
import { LoginDialogController } from './controllers'
import QrLogin from './QrLogin.vue'
import WindowLogin from './WindowLogin.vue'
import TitleBar from './TitleBar.vue'
const lct = useController(LoginDialogController)
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
