<script setup lang="ts">
import { computed, defineModel, defineProps, type PropType } from 'vue'
import type { InputProperties } from '../../types'

const props = defineProps({
  input: {
    type: Object as PropType<InputProperties>,
    required: true,
  },
  theme: {
    type: Object,
    default: () => ({
      container: 'flex flex-col gap-4',
      label: 'text-lg font-semibold text-black dark:text-white',
      scaleContainer: 'flex flex-col items-center',
      scale: 'flex justify-between w-full max-w-3xl',
      button:
        'w-8 h-8 rounded-full text-sm font-medium focus:outline-none transition-colors',
      buttonSelected: 'bg-blue-500 text-white',
      buttonUnselected: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
      endLabels: 'flex justify-between w-full max-w-3xl mt-2',
      endLabel: 'text-sm text-gray-600 dark:text-gray-400',
      error: 'text-red-600 dark:text-red-400',
    }),
  },
  error: {
    type: String,
    default: '',
  },
})

const model = defineModel<number>()
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
    <div :class="theme.scaleContainer">
      <div :class="theme.scale">
        <button
          v-for="value in 11"
          :key="value - 1"
          :class="[
            theme.button,
            model === value - 1 ? theme.buttonSelected : theme.buttonUnselected,
          ]"
          @click="model = value - 1"
        >
          {{ value - 1 }}
        </button>
      </div>
      <div :class="theme.endLabels">
        <span :class="theme.endLabel">Not likely</span>
        <span :class="theme.endLabel">Very likely</span>
      </div>
    </div>
    <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
      {{ error }}
    </small>
  </div>
</template>
