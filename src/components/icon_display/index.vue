<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import type { DisplayProperties } from '../../types'

defineProps({
  display: {
    type: Object as PropType<DisplayProperties>,
    required: true,
  },
  theme: {
    type: Object,
    default: () => ({
      icon: 'text-slate-700 dark:text-slate-300', // Default icon color
      size: 'text-10xl', // Default icon size (you can change it to match your design)
      color: 'text-blue-500',
    }),
  },
})
</script>

<template>
  <i
    :class="[
      display.icon,
      theme.icon,
      display.size || theme.size,
      display.color || theme.color,
    ]"
    :aria-label="display.alt || 'Icon'"
  />
</template>
