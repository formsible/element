<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  defineProps,
  defineModel,
  type PropType,
} from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import type { InputProperties } from '../../types'

const props = defineProps({
  input: {
    type: Object as PropType<InputProperties>,
    required: true,
  },
  theme: {
    type: Object,
    default: () => ({
      container: '', // Dark mode background
      item: 'p-2 bg-gray-100 dark:bg-gray-800 rounded  mb-2 text-gray-800 dark:text-gray-200',
      dragHandle: 'cursor-move',
      submitButton:
        'mt-4 p-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-800',
      label: 'w-full text-lg font-semibold text-gray-900 dark:text-gray-100',
      description: 'text-sm text-gray-700 dark:text-gray-400 mb-1',
      error: 'text-red-600',
    }),
  },
  error: {
    type: String,
    default: '',
  },
})

const items = ref(props.input.choices)
const el = ref<HTMLElement | null>(null)
const model = defineModel<string[]>({
  default: [],
})

useSortable(el, items, {
  handle: '.handle',
  chosenClass: 'dragClass',
  animation: 150,
  onEnd() {
    model.value = items.value.map((item) => item.value)
  },
})

// Sync items with props to handle external changes
watch(
  () => props.input.choices,
  (newChoices) => {
    items.value = newChoices
  },
)
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
    <div ref="el">
      <div v-for="item in items" :key="item.value" :class="theme.item">
        <span class="handle" :class="theme.dragHandle">☰</span>
        {{ item.label }}
      </div>
    </div>
    <!-- if error -->
    <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
      {{ error }}
    </small>
  </div>
</template>

<style scoped lang="css">
.dragClass {
  outline: 2px solid var(--p-primary-500);
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}
</style>
