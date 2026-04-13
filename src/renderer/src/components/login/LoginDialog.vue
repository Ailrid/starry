<template>
  <Dialog>
    <template #trigger="{ open }">
      <div
        class="cursor-pointer transition-transform hover:scale-105 active:scale-95"
        @click="open"
      >
        <Img
          v-if="lct.userProfile"
          :cover="lct.userProfile.avatar"
          class="h-7! w-7! rounded-full border shadow-sm"
        />
        <Button v-else variant="none" @click.stop="lct.login()">
          <User :size="18"></User>
        </Button>
      </div>
    </template>
    <template #context="{ close }">
      <div class="relative flex flex-col border">
        <Button
          @click="close"
          variant="icon"
          class="hover:text-primary absolute top-2 right-2 z-10000 h-10 w-10 active:opacity-50"
          :size="18"
        >
          <X :size="18" :stroke-width="1.2" />
        </Button>
        <UserCard />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from '../ui/dialog/Dialog.vue'
import Button from '@/components/ui/Button.vue'
import { useController } from '@virid/vue'
import { UserDialogController } from './controllers'
import UserCard from './UserCard.vue'
import Img from '../public/Img.vue'
import { X, User } from 'lucide-vue-next'
const lct = useController(UserDialogController)
</script>