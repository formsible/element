<script setup lang="ts">
import { HTMLBlockMediaProperties } from '../../types'

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
        :width="display.width"
        :height="display.type == 'video' ? display.height : undefined"
    >
        <template>
            <source
                v-for="source in display.sources"
                :key="source.src"
                :src="source.src"
                :media="source.media"
                :type="source.type"
            />
            <p>{{ display.alt }}</p>
        </template>
    </component>
</template>
