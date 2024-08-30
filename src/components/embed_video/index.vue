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
      videoContainer: 'relative',
      video: 'w-full h-full',
    }),
  },
})

// Function to detect the video type based on the src URL
const detectVideoType = (url: string) => {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube'
  }
  if (url.includes('vimeo.com')) {
    return 'vimeo'
  }
  if (url.match(/\.(mp4|webm|ogg)$/)) {
    return 'html5'
  }
  return 'html5' // Default to HTML5 if no match
}
const src = props.display.src || ''
const width = props.display.width || '640px'
const height = props.display.height || '360px'
const videoType = detectVideoType(src)
const videoComponent = computed(() => {
  return videoType === 'youtube'
    ? 'iframe'
    : videoType === 'vimeo'
    ? 'iframe'
    : 'video'
})
const showurl = computed(() => {
  return videoType === 'youtube'
    ? `https://www.youtube.com/embed/${new URL(src).searchParams.get('v')}`
    : videoType === 'vimeo'
    ? `https://player.vimeo.com/video/${src.split('/').pop()}`
    : src
})
</script>

<template>
  <div :class="theme.videoContainer" :style="{ width, height }">
    <component
      :is="videoComponent"
      :src="showurl"
      controls
      :class="theme.video"
      :style="{ width, height }"
    />
  </div>
</template>
