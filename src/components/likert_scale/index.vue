<script setup lang="ts">
import { defineModel, computed, defineProps, type PropType } from 'vue'
import type { InputProperties } from '../../types'
import RadioButton from 'primevue/radiobutton'

const props = defineProps({
  input: {
    type: Object as PropType<InputProperties>,
    required: true,
  },
  theme: {
    type: Object,
    default: () => ({
      container: 'flex flex-col gap-2',
      label: 'w-full text-black dark:text-white', // Label colors for dark and light mode
      input: 'flex items-center text-black dark:text-white', // Ensure RadioButton and label text colors adapt
      description: 'text-sm text-slate-700 dark:text-slate-300', // Description text for both modes
      error: 'text-red-600 dark:text-red-400', // Error colors for dark and light mode
    }),
  },
  error: {
    type: String,
    default: '',
  },
})
const model = defineModel<string>({ default: '' })
const isRequired = computed(() =>
  props.input.validations?.map((v) => v.rule).includes('required')
)
</script>

<template>
  <div :class="theme.container">
    <label :class="theme.label">
      {{ input.label }}
      <span v-if="isRequired" class="text-red-600 dark:text-red-400">*</span>
    </label>
    <p :class="theme.description">{{ input.description }}</p>
    <div class="flex flex-col">
      <div
        v-for="option in input.choices"
        :key="option.value"
        class="flex items-center mb-2"
      >
        <RadioButton
          :id="`${input.key}-${option.value}`"
          v-model="model"
          :value="option.value"
          :input-id="`${input.key}-${option.value}`"
          :class="theme.input"
          v-bind="{ ...$attrs, ...input.props }"
        />
        <label
          :for="`${input.key}-${option.value}`"
          class="ml-2 text-black dark:text-white"
        >
          {{ option.label }}
        </label>
      </div>
    </div>
    <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
      {{ error }}
    </small>
  </div>
</template>
