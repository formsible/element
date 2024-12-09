<script setup lang="ts">
import type { InputChoiceProperties } from '~/types'
import Checkbox from 'primevue/checkbox'
import { computed } from 'vue'

interface Props {
    input: InputChoiceProperties
    error?: string
}
const props = defineProps<Props>()
const model = defineModel<string[]>()
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
</script>

<template>
    <div>
        <label :for="input.key" class="font-semibold">
            {{ input.label }}
            <span v-if="isRequired" class="text-red-600 dark:text-red-400"
                >*</span
            >
            <!-- Adjusted for dark mode -->
        </label>
        <p class="text-gray-600 text-sm">{{ input.description }}</p>
        <div>
            <div
                v-for="option in input.choices"
                :key="option.value"
                class="flex items-center gap-1 mt-2"
            >
                <Checkbox
                    :id="option.value"
                    v-model="model"
                    :value="option.value"
                    :input-id="option.value"
                    v-bind="{ ...$attrs, ...props.input.props }"
                />
                <label :for="option.value">{{ option.label }}</label>
                <!-- Applied label styling -->
            </div>
        </div>
        <small v-if="error" :id="`${input.key}-help`">
            {{ error }}
        </small>
    </div>
</template>
