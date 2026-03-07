<script setup lang="ts">
import type { SelectTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ChevronDown } from 'lucide-vue-next'
import { SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<SelectTriggerProps & { class?: HTMLAttributes['class']; size?: 'sm' | 'default' }>(),
  { size: 'default' }
)

const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :data-size="size"
    v-bind="forwardedProps"
    :class="
      cn(
        // 基础布局：增加字间距 tracking-wide，使用更细的 font-medium
        'flex h-9 w-full items-center justify-between gap-3 rounded-xl px-4 py-2 transition-all duration-300',
        'text-xs font-medium tracking-wide tabular-nums',

        // 背景与边框：弱化边框，改为半透明背景叠加
        'bg-secondary/50 border border-white/5 shadow-inner backdrop-blur-md',
        'hover:bg-secondary/50 hover:border-white/10',

        // 状态处理
        'focus-visible:ring-primary/30 focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:outline-none',

        // 图标与占位符：调淡图标，增加顺滑的过渡
        'placeholder:text-muted-foreground/50 [&_svg]:text-muted-foreground/40 group-hover:[&_svg]:text-primary/60 [&_svg]:size-3.5 [&_svg]:transition-colors',

        // 异常状态
        'overflow-hidden whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-40',

        props.class
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="size-4 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
