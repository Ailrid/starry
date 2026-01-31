<template>
  <div>{{ ctrl.volume }}</div>
  <button @click="() => MessageWriter.write(new TestMessage())">增加音量</button>
</template>

<script setup lang="ts">
import { useController } from '@/core/hooks'
import { TestMessage, TestController } from '@/ecs/systems/testSystem'
import { MessageWriter } from '@/core/message'
const ctrl = useController<TestController>(TestController) // 内部处理所有 metadata 包装
</script>

<style lang="scss" scoped></style>
