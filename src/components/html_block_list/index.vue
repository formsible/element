<script setup lang="ts">
import { HTMLBlockListProperties } from '../../types'

interface Props {
    display: HTMLBlockListProperties
}

defineProps<Props>()
</script>

<template>
    <ul v-if="display.type == 'unordered'">
        <li v-for="item in display.items" :key="item">{{ item }}</li>
    </ul>
    <ol v-else>
        <li v-for="item in display.items" :key="item">{{ item }}</li>
    </ol>
</template>
