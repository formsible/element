<script setup lang="ts">
import { computed } from 'vue'
import type { InputChoiceProperties } from '~/types'
import RadioButton from 'primevue/radiobutton'

interface Props {
    input: InputChoiceProperties
    error?: string
}
const props = defineProps<Props>()

const model = defineModel<string>({ default: '' })

const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
</script>

<template>
    <div>
        <p class="font-medium">
            {{ props.input.label }}
            <span v-if="isRequired" class="text-red-500">*</span>
        </p>
        <p class="mb-2 text-sm">{{ props.input.description }}</p>

        <div class="flex flex-col">
            <div
                v-for="option in input.choices"
                :key="option.value"
                class="flex items-center mb-2"
            >
                <RadioButton
                    :id="`${input.key}-${option.value}`"
                    v-model="model"
                    :value="option.value"
                    :input-id="`${input.key}-${option.value}`"
                    v-bind="input.props"
                />
                <label
                    :for="`${input.key}-${option.value}`"
                    class="ml-2 text-black dark:text-white"
                >
                    {{ option.label }}
                </label>
            </div>
        </div>
        <small v-if="error" :id="`${input.key}-help`" class="text-red-500">
            {{ error }}
        </small>
    </div>
</template>
