<script setup lang="ts">
import { defineModel, computed, defineProps, type PropType } from 'vue'
import type { InputProperties } from '../../../types'
import Checkbox from 'primevue/checkbox'

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
            input: 'flex flex-col gap-2', // Layout for checkboxes
            description: 'text-sm text-slate-700 dark:text-slate-300', // Description text for both modes
            checkbox: 'mr-2', // Margin for checkbox alignment
            checkboxLabel: 'text-black dark:text-white', // Added text color for checkbox labels
            error: 'text-red-600 dark:text-red-400', // Added dark mode color for error
        }),
    },
    error: {
        type: String,
        default: '',
    },
})
const model = defineModel<string[]>()
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
        <div :class="theme.input">
            <div
                v-for="option in input.choices"
                :key="option.value"
                class="flex items-center"
            >
                <Checkbox
                    :id="option.value"
                    v-model="model"
                    :value="option.value"
                    :input-id="option.value"
                    v-bind="{ ...$attrs, ...props.input.props }"
                />
                <label :for="option.value" :class="theme.checkboxLabel">{{
                    option.label
                }}</label>
                <!-- Applied label styling -->
            </div>
        </div>
        <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
            {{ error }}
        </small>
    </div>
</template>
