<script setup lang="ts">
import { defineModel, computed, defineProps, type PropType } from 'vue'
import InputText from 'primevue/inputtext'
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
            label: 'w-full text-lg font-semibold text-gray-900 dark:text-gray-100',
            input: 'w-full p-2 border rounded-md shadow-sm bg-white dark:bg-surface-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100',
            description: 'text-sm text-gray-700 dark:text-gray-400',
            error: 'text-red-600',
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
            <span v-if="isRequired" class="text-red-600">*</span>
        </label>
        <p :class="theme.description">{{ input.description }}</p>
        <!-- input section -->
        <InputText
            :id="input.key"
            v-model="model"
            :input-id="input.key"
            :class="theme.input"
            :placeholder="input?.placeholder || 'Enter website URL'"
            v-bind="{ ...$attrs, ...input.props }"
        />
        <!-- if error -->
        <small v-if="error" :id="`${input.key}-help`" :class="theme.error">{{
            error
        }}</small>
    </div>
</template>
