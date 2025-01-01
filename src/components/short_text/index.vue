<script setup lang="ts">
import { computed } from 'vue'
import type { InputProperties } from '~/types'
import InputText from 'primevue/inputtext'

interface Props {
    input: InputProperties
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
        <label :for="input.key" class="font-semibold">
            {{ props.input.label }}
            <span v-if="isRequired" class="text-red-500">*</span>
        </label>
        <p class="mb-2 text-gray-600 text-sm">{{ props.input.description }}</p>

        <InputText
            :id="input.key"
            v-model="model"
            :input-id="input.key"
            v-bind="input.props"
            class="w-full max-w-xl"
        />
        <p v-if="error" class="text-red-500 text-sm mt-0.5">
            {{ error }}
        </p>
    </div>
</template>
