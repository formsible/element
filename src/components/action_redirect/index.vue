<script setup lang="ts">
import { defineProps, PropType, ref, onMounted, onBeforeUnmount } from 'vue'
import type { DisplayProperties } from '../../types'

const props = defineProps({
  display: {
    type: Object as PropType<DisplayProperties>,
    required: true,
  },
  theme: {
    type: Object,
    default: () => ({
      buttonClass: 'bg-blue-500 text-white font-bold py-2 px-4 rounded transition-all hover:bg-blue-700 shadow-lg',
      progressClass: 'bg-blue-400 h-2 rounded-full transition-all duration-500',
      cancelClass: 'bg-red-500 text-white font-bold py-2 px-4 rounded ml-2 hover:bg-red-600',
    }),
  },
  readonly: {
    type: Boolean, default: false
  }
})

// Countdown timer and progress
const countdown = ref(5)
const progress = ref(100)
// eslint-disable-next-line no-undef
const interval = ref<NodeJS.Timeout | null>(null)
const redirecting = ref(true)

// Automatically redirect after 5 seconds
onMounted(() => {
  interval.value = setInterval(() => {
    countdown.value -= 1
    progress.value = (countdown.value / 5) * 100
    if (countdown.value === 0) {
      clearInterval(interval.value!)
      if (!props.readonly) window.location.href = props.display.src as string
    }
  }, 1000)
})

// Option to cancel redirection
const cancelRedirect = () => {
  redirecting.value = false
  if (interval.value) {
    clearInterval(interval.value)
  }
}

// Cleanup on component unmount
onBeforeUnmount(() => {
  if (interval.value) {
    clearInterval(interval.value)
  }
})
</script>

<template>
  <div class="p-4 max-w-md mx-auto">
  <p>{{ props.readonly }}</p>
    <div v-if="redirecting">
      <p class="text-lg mb-4">You are being redirected to <strong>{{ display.src }}</strong> in {{ countdown }} seconds.
      </p>
      <div class="relative w-full bg-gray-200 rounded-full h-2 mb-4">
        <div :class="theme.progressClass" :style="{ width: progress + '%' }"></div>
      </div>
      <button :class="theme.buttonClass" v-bind="$attrs">
        Redirecting...
      </button>
      <button :class="theme.cancelClass" @click="cancelRedirect">
        Cancel
      </button>
    </div>
    <div v-else>
      <p class="text-lg text-red-500">Redirection has been canceled.</p>
    </div>
  </div>
</template>
