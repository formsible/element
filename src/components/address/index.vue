<script setup lang="ts">
import { defineProps, defineModel, computed, type PropType } from 'vue'
import TextArea from 'primevue/textarea'
import type { InputProperties } from '~/types'

// Define props
const props = defineProps({
    input: {
        type: Object as PropType<InputProperties>,
        required: true,
    },
    theme: {
        type: Object,
        default: () => ({
            container: '',
            label: 'w-full text-black dark:text-white',
            input: 'w-full bg-white dark:bg-surface-800 text-black dark:text-white',
            description: 'text-sm text-slate-700 dark:text-slate-300',
            error: 'text-red-600 dark:text-red-400',
        }),
    },
    error: {
        type: String,
        default: '',
    },
})

// Define model
const model = defineModel<string>({
    required: true,
    default: '',
})
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
</script>

<template>
    <div :class="props.theme.container">
        <label :class="props.theme.label" :for="props.input.key">
            {{ props.input.label }}
            <span v-if="isRequired" class="text-red-600 dark:text-red-400"
                >*</span
            >
        </label>
        <p :class="theme.description">{{ input.description }}</p>
        <!-- input section -->
        <TextArea
            :id="props.input.key"
            v-model="model"
            :input-id="props.input.key"
            :class="props.theme.input"
            rows="4"
            :placeholder="props.input?.placeholder || 'Enter your address'"
            v-bind="{ ...$attrs, ...props.input.props }"
        />
        <!-- if error -->
        <small
            v-if="props.error"
            :id="`${props.input.key}-help`"
            :class="props.theme.error"
        >
            {{ props.error }}
        </small>
    </div>
</template>
