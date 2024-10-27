<script setup lang="ts">
import type { InputProperties } from '~/types'
import DatePicker from 'primevue/datepicker'
import { computed } from 'vue'

interface Props {
    input: InputProperties
    error?: string
}

const props = defineProps<Props>()

const model = defineModel<any>({ default: '' })
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
</script>

<template>
    <div>
        <label :for="input.key">
            {{ input.label }}
            <span v-if="isRequired" class="text-red-600 dark:text-red-400"
                >*</span
            >
        </label>
        <p>{{ input.description }}</p>
        <DatePicker
            v-model="model"
            showIcon
            fluid
            iconDisplay="input"
            v-bind="{ ...$attrs, ...props.input.props }"
        />
        <small v-if="error" :id="`${input.key}-help`">
            {{ error }}
        </small>
    </div>
</template>
