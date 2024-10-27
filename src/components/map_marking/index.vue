<script setup lang="ts">
import { computed, defineModel, defineProps, type PropType } from 'vue'
import type { InputProperties } from '../../../types'
import InputText from 'primevue/inputtext'

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
            input: 'w-full',
            description: 'text-sm text-slate-700 dark:text-slate-300',
            error: 'text-red-600',
        }),
    },
    error: {
        type: String,
        default: '',
    },
})
const model = defineModel<string>({ default: '' })
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
        <!-- input section -->
        <InputText
            :id="input.key"
            v-model="model"
            :input-id="input.key"
            :class="theme.input"
            rows="3"
            v-bind="{ ...$attrs, ...input.props }"
        />
        <!-- if error -->
        <small v-if="error" :id="`${input.key}-help`" :class="theme.error">{{
            error
        }}</small>
    </div>
</template>
