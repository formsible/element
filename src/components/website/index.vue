<script setup lang="ts">
import { computed } from 'vue'
import InputText from 'primevue/inputtext'
import type { InputProperties } from '~/types'

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
            {{ input.label }}
            <span v-if="isRequired" class="text-red-600">*</span>
        </label>
        <p>{{ input.description }}</p>

        <!-- input section -->
        <InputText
            :id="input.key"
            v-model="model"
            :input-id="input.key"
            v-bind="input.props"
        />

        <!-- if error -->
        <small v-if="error" :id="`${input.key}-help`">{{ error }}</small>
    </div>
</template>
