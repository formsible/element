<script setup lang="ts">
import { HTMLBlockMediaProperties } from '~/types'

interface Props {
    display: HTMLBlockMediaProperties
}

defineProps<Props>()
</script>

<template>
    <img
        v-if="display.type == 'img'"
        :src="display.src"
        :width="display.width"
        :height="display.height"
        :alt="display.alt"
    />
    <component
        v-else
        :is="display.type"
        :controls="display.controls || true"
        :width="display.type == 'video' ? display.height || 400 : undefined"
        :height="display.type == 'video' ? display.height || 320 : undefined"
    >
        <source
            v-for="source in display.sources"
            :key="source.src"
            :src="source.src"
            :media="source.media"
            :type="source.type"
        />
        <p>{{ display.alt }}</p>
    </component>
</template>
