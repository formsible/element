<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { ActionRedirectProperties } from '~/types'

interface Props {
    display: ActionRedirectProperties
}
const props = defineProps<Props>()

// Countdown timer and progress
const countdown = ref(5)
const progress = ref(100)
const interval = ref<NodeJS.Timeout | null>(null)
const redirecting = ref(true)

// Automatically redirect after 5 seconds
onMounted(() => {
    interval.value = setInterval(() => {
        countdown.value -= 1
        progress.value = (countdown.value / 5) * 100
        if (countdown.value === 0) {
            clearInterval(interval.value!)
            window.location.href = props.display.src as string
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
        <div v-if="redirecting">
            <p class="text-lg mb-4">
                You are being redirected to
                <strong>{{ display.src }}</strong> in {{ countdown }} seconds.
            </p>
            <div class="relative w-full bg-surface-200 rounded-full h-2 mb-4">
                <div :style="{ width: progress + '%' }"></div>
            </div>
            <Button severity="danger" @click="cancelRedirect"> Cancel </Button>
        </div>
        <div v-else>
            <p class="text-lg text-red-500">Redirection has been canceled.</p>
        </div>
    </div>
</template>
