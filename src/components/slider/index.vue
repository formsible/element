<script setup lang="ts">
import { defineModel, computed, defineProps, type PropType } from 'vue'
import InputSlider from 'primevue/slider'
import type { InputProperties } from '../../types'

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
            input: 'w-full bg-white dark:bg-surface-800 border border-gray-300 dark:border-gray-600 rounded-md',
            description: 'text-sm text-gray-700 dark:text-gray-400',
            error: 'text-red-600',
        }),
    },
    error: {
        type: String,
        default: '',
    },
    readonly: {
        type: Boolean,
        default: false,
    },
})
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
const model = defineModel<number>()
</script>

<template>
    <div :class="theme.container">
        <p class="font-medium">
            {{ props.input.label }}
            <span v-if="isRequired" class="text-red-500">*</span>
        </p>
        <p class="mb-4 text-sm">{{ props.input.description }}</p>

        <!-- input section -->
        <InputSlider
            :id="input.key"
            v-model="model"
            :input-id="input.key"
            :class="[
                theme.input,
                {
                    'border-red-600': error,
                    'border-gray-300 dark:border-gray-600': !error,
                },
            ]"
            :disabled="readonly"
            :min="input.props?.min"
            :max="input.props?.max"
            :step="input.props?.step"
            :tooltip="input.props?.tooltip || false"
            :placeholder="input?.placeholder || 'Select a value'"
            v-bind="{ ...$attrs, ...input.props }"
        />
        <!-- if error -->
        <small v-if="error" :id="`${input.key}-help`" :class="theme.error">{{
            error
        }}</small>
    </div>
</template>
