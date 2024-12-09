<script setup lang="ts">
import { computed } from 'vue'
import type { InputChoiceProperties } from '~/types'
import RadioButton from 'primevue/radiobutton'

interface Props {
    input: InputChoiceProperties
    error?: string
}
const props = defineProps<Props>()
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
const model = defineModel<string>({ default: '' })
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
        <div class="mt-2">
            <div
                v-for="option in input.choices"
                :key="option.value"
                class="flex items-center gap-1 mt-2"
            >
                <RadioButton
                    :id="option.value"
                    v-model="model"
                    :value="option.value"
                    :input-id="option.value"
                    v-bind="input.props"
                />
                <label :for="option.value" class="text-sm">{{
                    option.label
                }}</label>
                <!-- Applied label styling -->
            </div>
        </div>
        <small v-if="error" :id="`${input.key}-help`" class="text-red-500">
            {{ error }}
        </small>
    </div>
</template>
