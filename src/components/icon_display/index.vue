<script setup lang="ts">
import type { IconDisplayProperties } from '../../../types'

interface Props {
    display: IconDisplayProperties
}
defineProps<Props>()
</script>

<template>
    <i :class="[display.icon]" aria-label="Icon" />
</template>
