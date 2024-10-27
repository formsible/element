<script setup lang="ts">
import { computed } from 'vue'
import type { EmbedProperties } from '~/types'

interface Props {
    display: EmbedProperties
}
const props = defineProps<Props>()

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

const documentType = detectDocumentType(props.display.src)

// Generate iframe src based on the detected document type
const iframeSrc = computed(() => {
    if (documentType === 'pdf') {
        return props.display.src
    }
    if (documentType === 'google-doc') {
        const url = new URL(props.display.src)
        const docId = url.pathname.split('/')[3]
        return `https://docs.google.com/document/d/${docId}/preview`
    }
    if (documentType === 'office-doc') {
        const url = new URL(props.display.src)
        return `${url.origin}/view?resid=${url.pathname.split('/')[3]}`
    }
    if (documentType === 'notion-doc') {
        return `https://www.notion.so/embed/${new URL(
            props.display.src,
        ).pathname
            .split('/')
            .pop()}`
    }
    return ''
})
</script>

<template>
    <iframe
        v-if="iframeSrc"
        :src="iframeSrc"
        :width="display.width || 300"
        :height="display.height || 200"
        allowfullscreen
    />
    <p v-else>Unsupported document format</p>
</template>
