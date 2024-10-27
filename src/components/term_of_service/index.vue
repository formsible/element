<script setup lang="ts">
import { defineProps, computed, defineModel, type PropType } from 'vue'
import type { InputProperties } from '~/types'
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
            label: 'flex items-center gap-2',
            checkbox: 'mr-2',
            description: 'text-sm text-slate-700 dark:text-slate-300',
            error: 'text-red-600',
        }),
    },
    error: {
        type: String,
        default: '',
    },
})
const model = defineModel<boolean>({ required: true })
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
</script>

<template>
    <div :class="theme.container">
        <label :class="theme.label">
            <Checkbox :id="input.key" v-model="model" :class="theme.checkbox" />
            {{ input.label }}
            <span v-if="isRequired" class="text-red-600">*</span>
        </label>
        <!-- Render description -->
        <p :class="theme.description">{{ input.description }}</p>
        <!-- If error -->
        <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
            {{ error }}
        </small>
    </div>
</template>

<style scoped>
/* Add specific styles if needed */
</style>
