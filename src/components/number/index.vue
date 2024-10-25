<script setup lang="ts">
import { computed, defineModel, defineProps } from 'vue'
import InputNumber from 'primevue/inputnumber'
import type { InputProperties } from '../../types'

interface Props {
    input: InputProperties
    error?: string
}
const props = defineProps<Props>()

const model = defineModel<number>()
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
</script>

<template>
    <div>
        <label :for="input.key">
            {{ input.label }}
            <span v-if="isRequired" class="text-red-600">*</span>
        </label>
        <p>{{ input.description }}</p>
        <!-- input section -->
        <InputNumber
            :id="input.key"
            v-model="model"
            :input-id="input.key"
            :placeholder="input?.placeholder || 'Enter a number'"
            v-bind="input.props"
        />
        <!-- if error -->
        <small v-if="error">{{ error }}</small>
    </div>
</template>
