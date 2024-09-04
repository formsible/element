<script setup lang="ts">
import { computed, defineModel, defineProps, type PropType } from 'vue'
import type { InputProperties } from '../../types'
import Select from 'primevue/select'

const props = defineProps({
  input: {
    type: Object as PropType<InputProperties>,
    required: true,
  },
  theme: {
    type: Object,
    default: () => ({
      container: '',
      label: 'w-full text-black dark:text-white', // Added text color for label
      input: 'w-full', // Applied to the dropdown input
      description: 'text-sm text-slate-700 dark:text-slate-300', // Description text for both modes
      error: 'text-red-600 dark:text-red-400', // Added dark mode color for error
    }),
  },
  error: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
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

    <Select
      :id="input.key"
      v-model="model"
      :disabled="readonly"
      :options="input.choices"
      option-label="label"
      option-value="value"
      :class="theme.input"
      :input-id="input.key"
      v-bind="{ ...$attrs, ...input.props }"
    />
    <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
      {{ error }}
    </small>
  </div>
</template>
