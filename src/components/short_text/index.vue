<script setup lang="ts">
import { computed, defineModel, defineProps, type PropType } from 'vue'
import type { InputProperties } from '../../types'
import InputText from 'primevue/inputtext'

const props = defineProps({
  input: {
    type: Object as PropType<InputProperties>,
    required: true,
  },
  theme: {
    type: Object,
    default: () => ({
      container: 'flex flex-col gap-2',
      label: 'w-full text-black dark:text-white',
      input: 'w-full bg-white dark:bg-gray-800 text-black dark:text-white',
      description: 'text-sm text-slate-700 dark:text-slate-300',
      error: 'text-red-600 dark:text-red-400',
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
    <label :class="theme.label" :for="input.key">
      {{ input.label }}
      <span v-if="isRequired" class="text-red-600 dark:text-red-400">*</span>
    </label>
    <p :class="theme.description">{{ input.description }}</p>
    <InputText
      :id="input.key"
      v-model="model"
      :input-id="input.key"
      :class="theme.input"
      v-bind="{ ...$attrs, ...input.props }"
    />
    <div v-if="error" :class="theme.error">
      <span class="material-icons">error_outline</span>
      {{ error }}
    </div>
  </div>
</template>

<style scoped></style>
