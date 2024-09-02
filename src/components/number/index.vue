<script setup lang="ts">
import { computed, defineModel, defineProps, type PropType } from 'vue'
import InputNumber from 'primevue/inputnumber'
import type { InputProperties } from '../../types'

const props = defineProps({
  input: {
    type: Object as PropType<InputProperties>,
    required: true,
  },
  theme: {
    type: Object,
    default: () => ({
      container: '',
      label: '',
      input: '',
      description: 'text-sm text-gray-700 dark:text-gray-400 mb-1',
      error: 'text-red-600',
    }),
  },
  error: {
    type: String,
    default: '',
  },
})

const model = defineModel<number>()
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
    <InputNumber
      :id="input.key"
      v-model="model"
      :input-id="input.key"
      :class="[theme.input]"
      :min="input.props?.min"
      :max="input.props?.max"
      :step="input.props?.step"
      :placeholder="input?.placeholder || 'Enter a number'"
      v-bind="{ ...$attrs, ...input.props }"
    />
    <!-- if error -->
    <small v-if="error" :id="`${input.key}-help`" :class="theme.error">{{
      error
    }}</small>
  </div>
</template>
