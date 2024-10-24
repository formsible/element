<script setup lang="ts">
import { computed, defineModel, defineProps, type PropType } from 'vue'
import type { InputProperties } from '../../types'
import TextArea from 'primevue/textarea'

const props = defineProps({
    input: {
        type: Object as PropType<InputProperties>,
        required: true,
    },
    theme: {
        type: Object,
        default: () => ({
            container: '',
            label: 'w-full text-black dark:text-white', // Added text color for label
            input: 'w-full h-32 bg-white dark:bg-surface-800 text-black dark:text-white', // Added background and text color for TextArea
            description: 'text-sm text-slate-700 dark:text-slate-300',
            error: 'text-red-600 dark:text-red-400', // Added dark mode color for error
        }),
    },
    error: {
        type: String,
        default: '',
    },
})
const model = defineModel<string>({ default: '' })
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
            <!-- Adjusted for dark mode -->
        </label>
        <p :class="theme.description">{{ input.description }}</p>
        <!-- TextArea section -->
        <TextArea
            :id="input.key"
            v-model="model"
            :input-id="input.key"
            :class="theme.input"
            v-bind="{ ...$attrs, ...input.props }"
            rows="5"
        />
        <!-- If error -->
        <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
            {{ error }}
        </small>
    </div>
</template>
