<script setup lang="ts">
import { computed, defineModel, defineProps, type PropType } from 'vue'
import type { InputProperties } from '../../types'
import DatePicker from 'primevue/datepicker'

const props = defineProps({
  input: {
    type: Object as PropType<InputProperties>,
    required: true,
  },
  theme: {
    type: Object,
    default: () => ({
      container: '',
      label: 'w-full text-black dark:text-white', // Label colors for dark and light mode
      inputContainer: 'relative w-full', // Wrapper for input and icon
      input: 'w-full pr-10', // Input styling with padding for the icon
      description: 'text-sm text-slate-700 dark:text-slate-300', // Description text for both modes
      error: 'text-red-600 dark:text-red-400', // Error colors for dark and light mode
      icon: 'absolute right-2 top-2 text-slate-600 dark:text-slate-400', // Icon styling
    }),
  },
  error: {
    type: String,
    default: '',
  },
})
const model = defineModel<Date | null>({ default: null })
const isRequired = computed(() =>
  props.input.validations?.map((v) => v.rule).includes('required'),
)
</script>

<template>
  <div :class="theme.container">
    <label :class="theme.label" :for="input.key">
      {{ input.label }}
      <span v-if="isRequired" class="text-red-600 dark:text-red-400">*</span>
    </label>
    <p :class="theme.description">{{ input.description }}</p>
    <div :class="theme.inputContainer">
      <DatePicker
        :id="input.key"
        v-model="model"
        time-only
        show-icon
        fluid
        icon-display="input"
        :class="theme.input"
        :input-id="input.key"
        v-bind="{ ...$attrs, ...input.props }"
      >
        <template #inputicon="slotProps">
          <i class="pi pi-clock" @click="slotProps.clickCallback" />
        </template>
      </DatePicker>
      <!-- The DatePicker component already includes an icon when 'showIcon' is true -->
    </div>
    <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
      {{ error }}
    </small>
  </div>
</template>
