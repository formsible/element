<script setup lang="ts">
import { computed, defineProps } from 'vue'
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
        <label :for="input.key">
            {{ props.input.label }}
            <span v-if="isRequired" class="text-red-500">*</span>
        </label>
        <p class="mb-2 text-sm">{{ props.input.description }}</p>

        <InputText
            :id="input.key"
            v-model="model"
            :placeholder="props.input.placeholder"
            :input-id="input.key"
            v-bind="{ ...$attrs, ...input.props }"
        />
        <p v-if="error">
            {{ error }}
        </p>
    </div>
</template>
