<script setup lang="ts">
import { HTMLBlockMediaProperties } from '~/types'

interface Props {
    display: HTMLBlockMediaProperties
}

defineProps<Props>()
</script>

<template>
    <img
        v-if="display.tag == 'img'"
        :src="display.src"
        :width="display.width"
        :height="display.height"
        :alt="display.alt"
    />
    <component
        v-else
        :is="display.tag"
        :controls="display.controls || true"
        :width="display.tag == 'video' ? display.height || 400 : undefined"
        :height="display.tag == 'video' ? display.height || 320 : undefined"
    >
        <source
            v-for="source in display.sources || []"
            :key="source.src"
            :src="source.src"
            :media="source.media"
            :type="source.type"
        />
        <source :src="display.src" />
        <p>
            {{
                display.alt || `Your browser does not support ${display.tag}.`
            }}
        </p>
    </component>
</template>
