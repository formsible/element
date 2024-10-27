<script setup lang="ts">
import { computed, defineModel, defineProps } from 'vue'
import type { InputProperties } from '~/types'
import Select from 'primevue/select'

interface Props {
    input: InputProperties
    error?: string
    readonly?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    readonly: false,
})
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
        <p>{{ props.input.description }}</p>

        <Select
            :id="input.key"
            v-model="model"
            :disabled="readonly"
            :options="input.choices"
            option-label="label"
            option-value="value"
            :input-id="input.key"
            v-bind="input.props"
        />
        <small v-if="error" :id="`${input.key}-help`">
            {{ error }}
        </small>
    </div>
</template>
