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
  readonly: {
    type: Boolean,
    default: false,
  },
})

const model = defineModel<number>()
const isRequired = computed(() =>
  props.input.validations?.map((v) => v.rule).includes('required'),
)
</script>

<template>
  <div :class="theme.container">
    <label :class="theme.label">
      {{ input.label }}
      <span v-if="isRequired" class="text-red-600 dark:text-red-400">*</span>
    </label>
    <div class="mr-auto">
      <div class="flex flex-row flex-wrap gap-3 mb-3">
        <button
          v-for="value in 11"
          :key="value - 1"
          :class="[
            'size-9 font-medium rounded border-2 transition-colors',
            {
              '!pointer-events-none': readonly,
            },
            {
              'border-[var(--p-primary-500)]': model == value - 1 && !readonly,
            },
          ]"
          @click="readonly ? () => {} : () => (model = value - 1)"
        >
          {{ value - 1 }}
        </button>
      </div>
      <div class="flex flex-row w-full justify-between">
        <p class="text-slate-400 dark:text-slate-600">Not likely</p>
        <p class="text-slate-400 dark:text-slate-600">Very likely</p>
      </div>
    </div>
    <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
      {{ error }}
    </small>
  </div>
</template>
