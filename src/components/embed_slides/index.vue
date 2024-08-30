<script setup lang="ts">
import { computed, defineProps, type PropType } from 'vue'
import type { DisplayProperties } from '../../types'

const props = defineProps({
  display: {
    type: Object as PropType<DisplayProperties>,
    required: true,
  },
  theme: {
    type: Object,
    default: () => ({
      container: 'relative',
      iframe: 'w-full h-full border-none',
    }),
  },
})

const src = props.display.src || ''
const width = props.display.width || '640px'
const height = props.display.height || '360px'

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

const slidesType = detectSlidesType(src)

// Generate iframe src based on the detected slides type
const iframeSrc = computed(() => {
  if (slidesType === 'google') {
    const url = new URL(src)
    const presentationId = url.pathname.split('/')[3]
    return `https://docs.google.com/presentation/d/${presentationId}/embed`
  }
  if (slidesType === 'office') {
    const url = new URL(src)
    return `${url.origin}/view?resid=${url.pathname.split('/')[3]}`
  }
  if (slidesType === 'prezi') {
    return src
  }
  if (slidesType === 'slideshare') {
    const url = new URL(src)
    const presentationId = url.pathname.split('/')[2]
    return `https://www.slideshare.net/slidelive/${presentationId}`
  }
  if (slidesType === 'zoho') {
    return src
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
    <p v-else>Unsupported slide format</p>
  </div>
</template>
