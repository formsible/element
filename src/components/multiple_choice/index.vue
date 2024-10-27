<script setup lang="ts">
import { computed, defineModel, defineProps, type PropType } from 'vue'
import type { InputProperties } from '~/types'
import RadioButton from 'primevue/radiobutton'

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
            input: 'flex flex-wrap gap-4', // Layout for radio buttons
            description: 'text-sm text-slate-700 dark:text-slate-300', // Description text for both modes
            radioButton: 'mr-2', // Margin for radio button alignment
            radioLabel: 'text-black dark:text-white', // Added text color for radio labels
            error: 'text-red-600 dark:text-red-400', // Added dark mode color for error
        }),
    },
    error: {
        type: String,
        default: '',
    },
})
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
const model = defineModel<string>({ default: '' })
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
                <RadioButton
                    :id="option.value"
                    v-model="model"
                    :value="option.value"
                    :input-id="option.value"
                    :class="theme.radioButton"
                    v-bind="{ ...$attrs, ...input.props }"
                />
                <label :for="option.value" :class="theme.radioLabel">{{
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
