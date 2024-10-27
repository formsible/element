<script setup lang="ts">
import { computed, defineProps, type PropType } from 'vue'
import type { DisplayProperties } from '../../../types'

const props = defineProps({
    display: {
        type: Object as PropType<DisplayProperties>,
        required: true,
    },
    theme: {
        type: Object,
        default: () => ({
            container: '',
            iframe: 'w-full h-full border-none',
        }),
    },
})

const src = props.display.src || ''
const width = props.display.width || '640px'
const height = props.display.height || '480px'

// Function to detect the document type based on the src URL
const detectDocumentType = (url: string) => {
    if (url.includes('docs.google.com/document')) {
        return 'google-doc'
    }
    if (url.includes('office.com')) {
        return 'office-doc'
    }
    if (url.includes('notion.so')) {
        return 'notion-doc'
    }
    if (url.endsWith('.pdf')) {
        return 'pdf'
    }
    return 'unknown'
}

const documentType = detectDocumentType(src)

// Generate iframe src based on the detected document type
const iframeSrc = computed(() => {
    if (documentType === 'pdf') {
        return src
    }
    if (documentType === 'google-doc') {
        const url = new URL(src)
        const docId = url.pathname.split('/')[3]
        return `https://docs.google.com/document/d/${docId}/preview`
    }
    if (documentType === 'office-doc') {
        const url = new URL(src)
        return `${url.origin}/view?resid=${url.pathname.split('/')[3]}`
    }
    if (documentType === 'notion-doc') {
        return `https://www.notion.so/embed/${new URL(src).pathname
            .split('/')
            .pop()}`
    }
    return ''
})
</script>

<template>
    <div :class="theme.container" :style="{ width, height }">
        <iframe
            v-if="iframeSrc"
            :src="iframeSrc"
            :style="{ width, height }"
            :class="theme.iframe"
            allowfullscreen
        />
        <p v-else>Unsupported document format</p>
    </div>
</template>
