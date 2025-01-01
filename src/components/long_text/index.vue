<script setup lang="ts">
import { computed, defineModel, defineProps } from 'vue'
import type { InputProperties } from '~/types'
import TextArea from 'primevue/textarea'

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
            {{ input.label }}
            <span v-if="isRequired" class="text-red-600 dark:text-red-400"
                >*</span
            >
            <!-- Adjusted for dark mode -->
        </label>
        <p class="text-gray-600 text-sm mb-3">{{ input.description }}</p>
        <!-- TextArea section -->
        <TextArea
            :id="input.key"
            v-model="model"
            :input-id="input.key"
            v-bind="{ ...$attrs, ...input.props }"
            rows="5"
            fluid
        />
        <!-- If error -->
        <small v-if="error" :id="`${input.key}-help`" class="text-sm mt-0.5">
            {{ error }}
        </small>
    </div>
</template>
