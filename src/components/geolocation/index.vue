<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, defineProps, ref } from 'vue'
import type { InputProperties } from '../../../types'

const props = defineProps({
    input: {
        type: Object as PropType<InputProperties>,
        required: true,
    },
    theme: {
        type: Object,
        default: () => ({
            container: '',
            label: 'w-full',
            button: 'w-full p-button p-component',
            description: 'text-sm text-slate-700 dark:text-slate-300',
            error: 'text-red-600',
        }),
    },
    error: {
        type: String,
        default: '',
    },
})

const location = ref<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null,
})

const handleGeolocation = async () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                location.value = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
                // Process or emit location data as needed
            },
            (error) => {
                console.error('Geolocation error:', error)
                // Handle error (e.g., show user feedback)
            },
        )
    } else {
        console.error('Geolocation not supported')
        // Handle unsupported case (e.g., notify user)
    }
}
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
</script>

<template>
    <div :class="theme.container">
        <label :class="theme.label">
            {{ input.label }}
            <span v-if="isRequired" class="text-red-600">*</span>
        </label>
        <p :class="theme.description">{{ input.description }}</p>
        <!-- Geolocation button -->
        <button :class="theme.button" @click="handleGeolocation">
            Get Location
        </button>
        <!-- Display location if available -->
        <div v-if="location.lat !== null && location.lng !== null">
            <p>Latitude: {{ location.lat }}</p>
            <p>Longitude: {{ location.lng }}</p>
        </div>
        <!-- If error -->
        <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
            {{ error }}
        </small>
    </div>
</template>

<style scoped>
/* Add specific styles if needed */
</style>
