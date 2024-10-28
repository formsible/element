<script setup lang="ts">
import { defineProps, type PropType } from 'vue'
import type { DisplayProperties } from '~/types'

defineProps({
    display: {
        type: Object as PropType<DisplayProperties>,
        required: true,
    },
    theme: {
        type: Object,
        default: () => ({
            container: '',
            label: 'w-full',
            input: 'w-full',
            description: 'text-sm text-slate-700 dark:text-slate-300',
            error: 'text-red-600',
        }),
    },
})
</script>
<template>
    <div :class="theme.container" />
</template>
