<script setup lang="ts">
import { computed, defineModel, defineProps, type PropType } from 'vue'
import type { InputProperties } from '../../../types'
import Rating from 'primevue/rating'

const props = defineProps({
    input: {
        type: Object as PropType<InputProperties>,
        required: true,
    },
    theme: {
        type: Object,
        default: () => ({
            container: '',
            label: 'w-full text-lg font-semibold text-gray-900 dark:text-gray-100',
            input: 'w-full', // Ensure the rating component takes full width
            description: 'text-sm text-slate-700 dark:text-slate-300', // Description text for both modes
            error: 'text-red-600 dark:text-red-400', // Error colors for dark and light mode
        }),
    },
    error: {
        type: String,
        default: '',
    },
})
const model = defineModel<number>()
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
</script>

<template>
    <div :class="theme.container">
        <label :class="theme.label" :for="input.key">
            {{ input.label }}
            <span v-if="isRequired" class="text-red-600 dark:text-red-400"
                >*</span
            >
        </label>
        <p :class="theme.description">{{ input.description }}</p>
        <Rating
            :id="input.key"
            v-model="model"
            :stars="input.scale || 5"
            :cancel="false"
            :class="theme.input"
            :input-id="input.key"
            v-bind="{ ...$attrs, ...input.props }"
        />
        <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
            {{ error }}
        </small>
    </div>
</template>
