<script setup lang="ts">
import type { DisplayProperties } from '../../types'

interface Props {
    display: DisplayProperties
}
defineProps<Props>()
</script>

<template>
    <i :class="[display.icon]" aria-label="Icon" />
</template>
