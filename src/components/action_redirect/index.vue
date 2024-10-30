<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core'
import { onMounted } from 'vue'
import type { ActionRedirectProperties } from '~/types'

// Props declaration
interface Props {
    display: ActionRedirectProperties
}
const props = defineProps<Props>()

// Countdown complete event
const onCountdownComplete = () => {
    window.location.href = props.display.url
}

// Timeout composable by vusue
const { start } = useTimeoutFn(
    onCountdownComplete,
    props.display.countDown || 3000,
)

// Hooks
onMounted(start)
</script>
<template>
    <div class="text-center">
        <p>You are being directed to {{ display.url }}.</p>
    </div>
</template>
