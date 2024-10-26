<script setup lang="ts">
import { HtmlBlockContentProperties } from '../../types'

interface Props {
    display: HtmlBlockContentProperties
}
defineProps<Props>()
</script>

<template>
    <component :is="display.type">
        {{ display.content }}
    </component>
</template>
