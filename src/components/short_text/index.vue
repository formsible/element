<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'
import type { InputProperties } from '../../types'
import InputText from 'primevue/inputtext'

interface Props {
    input: InputProperties
    error?: string
}

const props = withDefaults(defineProps<Props>(), {
    error: undefined,
})
const model = defineModel<string>({ default: '' })

const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
</script>

<template>
    <div :class="theme.container">
        <p class="font-medium">
            {{ props.input.label }}
            <span v-if="isRequired" class="text-red-500">*</span>
        </p>
        <p class="mb-2 text-sm">{{ props.input.description }}</p>

        <InputText
            :id="input.key"
            v-model="model"
            :placeholder="props.input.placeholder"
            :input-id="input.key"
            :class="theme.input"
            v-bind="{ ...$attrs, ...input.props }"
        />
        <div v-if="error" :class="theme.error">
            <span class="material-icons">error_outline</span>
            {{ error }}
        </div>
    </div>
</template>
