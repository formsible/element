<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ActionRedirectProperties } from '~/types'

// Props declaration
interface Props {
    display: ActionRedirectProperties
    redirect?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    redirect: true,
})

const secondsRemaining = ref(props.display.countDown || 3)

// Countdown complete event
const onCountdownComplete = () => (window.location.href = props.display.url)

// Interval for timer
setInterval(() => {
    if (secondsRemaining.value > 0 && props.redirect === true)
        secondsRemaining.value = secondsRemaining.value - 1
}, 1000)

// Watchers
watch(secondsRemaining, (newValue) => {
    if (newValue <= 0) onCountdownComplete()
})
</script>
<template>
    <div class="text-center">
        <p>
            You will be redirected in {{ secondsRemaining }} seconds to
            {{ display.url }}.
        </p>
    </div>
</template>
