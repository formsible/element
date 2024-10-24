<script setup lang="ts">
import {
    ref,
    computed,
    watch,
    defineProps,
    defineModel,
    type PropType,
} from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import type { InputProperties } from '../../types'

const props = defineProps({
    input: {
        type: Object as PropType<InputProperties>,
        required: true,
    },
    theme: {
        type: Object,
        default: () => ({
            container: '', // Dark mode background
            dragHandle: 'cursor-move',
            submitButton:
                'mt-4 p-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-800',
            label: 'w-full text-lg font-semibold text-gray-900 dark:text-gray-100',
            description: 'text-sm text-gray-700 dark:text-gray-400 mb-1',
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

const el = ref<HTMLElement | null>(null)
const model = defineModel<string[]>({
    required: true,
})

if (!props.readonly) {
    useSortable(el, model, {
        handle: '.handle',
        animation: 150,
    })
}

// Sync items with props to handle external changes
watch(
    () => props.input.choices,
    (newChoices) => {
        if (newChoices) model.value = newChoices.map((el) => el.label)
    },
    { immediate: true },
)
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
        <div ref="el" class="flex flex-col gap-3">
            <div
                v-for="item in model"
                :key="item"
                class="p-2 bg-surface-100 rounded dark:bg-surface-900"
            >
                <span class="handle" :class="theme.dragHandle">☰</span>
                {{ item }}
            </div>
        </div>
        <!-- if error -->
        <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
            {{ error }}
        </small>
    </div>
</template>
