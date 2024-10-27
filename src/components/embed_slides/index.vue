<script setup lang="ts">
import { computed } from 'vue'
import type { EmbedPropeties } from '~/types'

interface Props {
    display: EmbedPropeties
}
const props = defineProps<Props>()

// Function to detect the slides type based on the src URL
const detectSlidesType = (url: string) => {
    if (url.includes('docs.google.com/presentation')) {
        return 'google'
    }
    if (url.includes('office.com')) {
        return 'office'
    }
    if (url.includes('prezi.com')) {
        return 'prezi'
    }
    if (url.includes('slideshare.net')) {
        return 'slideshare'
    }
    if (url.includes('zoho.com/show')) {
        return 'zoho'
    }
    return 'unknown'
}

const slidesType = detectSlidesType(props.display.src)

// Generate iframe src based on the detected slides type
const iframeSrc = computed(() => {
    if (slidesType === 'google') {
        const url = new URL(props.display.src)
        const presentationId = url.pathname.split('/')[3]
        return `https://docs.google.com/presentation/d/${presentationId}/embed`
    }
    if (slidesType === 'office') {
        const url = new URL(props.display.src)
        return `${url.origin}/view?resid=${url.pathname.split('/')[3]}`
    }
    if (slidesType === 'prezi') {
        return props.display.src
    }
    if (slidesType === 'slideshare') {
        const url = new URL(props.display.src)
        const presentationId = url.pathname.split('/')[2]
        return `https://www.slideshare.net/slidelive/${presentationId}`
    }
    if (slidesType === 'zoho') {
        return props.display.src
    }
    return ''
})
</script>

<template>
    <iframe
        v-if="iframeSrc"
        :src="iframeSrc"
        :width="display.width || 640"
        :height="display.height || 360"
        allowfullscreen
    />
    <p v-else>Unsupported slide format</p>
</template>
