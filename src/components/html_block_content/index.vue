<script setup lang="ts">
import { HtmlBlockContentProperties } from '~/types'

interface Props {
    display: HtmlBlockContentProperties
}
defineProps<Props>()
</script>

<template>
    <div>
        <pre>{{ display }}</pre>
        <component :is="display.type">
            {{ display.content }}
        </component>
    </div>
</template>
