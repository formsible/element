<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, defineProps } from 'vue'
import type { InputProperties } from '~/types'

const props = defineProps({
    input: {
        type: Object as PropType<InputProperties>,
        required: true,
    },
    theme: {
        type: Object,
        default: () => ({
            container: '',
            label: '',
            input: '',
            description: 'text-sm text-gray-700 dark:text-gray-300',
            error: 'text-red-600 dark:text-red-400',
            toggleButton:
                'cursor-pointer text-blue-600 dark:text-blue-400 hover:underline',
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

const model = defineModel<string>({
    required: true,
})
</script>

<template>
    <div :class="theme.container">
        <label :class="theme.label" :for="input.key">
            {{ input.label }}
            <span
                v-if="isRequired"
                class="text-red-600 dark:text-red-400 -ml-0.5"
                >*</span
            >
        </label>
        <p :class="theme.description">{{ input.description }}</p>

        <Password
            v-model="model"
            :input-id="input.key"
            v-bind="{ ...$attrs, ...input.props }"
            :feedback="false"
            toggleMask
            :disabled="readonly"
        />

        <!-- if error -->
        <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
            {{ error }}
        </small>
    </div>
</template>
