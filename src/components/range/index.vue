<script setup lang="ts">
import { computed, defineProps, type PropType, ref } from 'vue'
import type { InputProperties } from '~/types'
import Slider from 'primevue/slider'

const props = defineProps({
    input: {
        type: Object as PropType<InputProperties>,
        required: true,
    },
    theme: {
        type: Object,
        default: () => ({
            container: '',
            label: 'w-full',
            description: 'text-sm text-slate-700 dark:text-slate-300',
            error: 'text-red-600',
            range: 'w-full',
        }),
    },
    error: {
        type: String,
        default: '',
    },
})

const model = ref<number>()
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
        <!-- Range input section -->
        <Slider
            :id="input.key"
            v-model="model"
            range
            :class="theme.range"
            :min="input.props?.min"
            :max="input.props?.max"
            :step="input.props?.step"
            v-bind="{ ...$attrs, ...input.props }"
        />
        <!-- Display the current value -->
        <div class="mt-2">
            <span>Value: {{ model }}</span>
        </div>
        <!-- if error -->
        <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
            {{ error }}
        </small>
    </div>
</template>
