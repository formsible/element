<script setup lang="ts">
import { computed, ComputedRef } from 'vue'
import type { InputChoice, InputChoiceProperties } from '~/types'
import RadioButton from 'primevue/radiobutton'
import { useFetch } from '@vueuse/core'

interface Props {
    input: InputChoiceProperties
    error?: string
}
const props = defineProps<Props>()
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
const model = defineModel<string>({ default: '' })

const computedChoices: ComputedRef<InputChoice[] | null> = computed(() => {
    if (props.input.fetch) {
        const {
            // isFetching,
            // error: fetchError,
            data,
        } = useFetch<InputChoice[]>(props.input.fetch.url)
        return data.value
    } else return props.input.choices
})
</script>

<template>
    <div>
        <pre>{{ computedChoices }}</pre>
        <label :for="input.key">
            {{ input.label }}
            <span v-if="isRequired" class="text-red-600 dark:text-red-400"
                >*</span
            >
            <!-- Adjusted for dark mode -->
        </label>
        <p>{{ input.description }}</p>
        <div>
            <div
                v-for="option in computedChoices"
                :key="option.value"
                class="flex items-center"
            >
                <RadioButton
                    :id="option.value"
                    v-model="model"
                    :value="option.value"
                    :input-id="option.value"
                    v-bind="input.props"
                />
                <label :for="option.value">{{ option.label }}</label>
                <!-- Applied label styling -->
            </div>
        </div>
        <small v-if="error" :id="`${input.key}-help`" class="text-red-500">
            {{ error }}
        </small>
    </div>
</template>
