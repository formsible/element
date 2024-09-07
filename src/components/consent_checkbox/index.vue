<script setup lang="ts">
import { defineProps, type PropType, ref, computed } from 'vue'
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
      label: 'flex items-center gap-2',
      checkbox: 'h-4 w-4',
      description: 'text-sm text-slate-700 dark:text-slate-300',
      error: 'text-red-600',
    }),
  },
  error: {
    type: String,
    default: '',
  },
})

const model = ref<boolean>(false)
const isRequired = computed(() =>
  props.input.validations?.map((v) => v.rule).includes('required'),
)
</script>

<template>
  <div :class="theme.container">
    <label :class="theme.label" :for="input.key">
      <input
        :id="input.key"
        v-model="model"
        type="checkbox"
        :class="theme.checkbox"
        :required="isRequired"
        v-bind="{ ...$attrs, ...props.input.props }"
      />
      <span>{{ input.label }}</span>
      <span v-if="isRequired" class="text-red-600">*</span>
    </label>
    <p :class="theme.description">{{ input.description }}</p>
    <!-- if error -->
    <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
      {{ error }}
    </small>
  </div>
</template>
