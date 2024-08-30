<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, defineProps, ref } from 'vue'
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
      label: 'w-full text-lg font-semibold text-gray-900 dark:text-gray-100',
      input:
        'w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100',
      description: 'text-sm text-gray-700 dark:text-gray-300',
      error: 'text-red-600 dark:text-red-400',
      toggleButton:
        'cursor-pointer text-blue-600 dark:text-blue-400 hover:underline',
    }),
  },
  error: {
    type: String,
    default: '',
  },
})
const isRequired = computed(() =>
  props.input.validations?.map((v) => v.rule).includes('required')
)

const model = ref<string>('')
const showPassword = ref<boolean>(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div :class="theme.container">
    <label :class="theme.label" :for="input.key">
      {{ input.label }}
      <span v-if="isRequired" class="text-red-600 dark:text-red-400">*</span>
    </label>
    <p :class="theme.description">{{ input.description }}</p>
    <!-- Password input -->
    <div class="relative">
      <InputText
        :id="input.key"
        v-model="model"
        :type="showPassword ? 'text' : 'password'"
        :class="theme.input"
        :input-id="input.key"
        v-bind="{ ...$attrs, ...input.props }"
      />
      <button
        type="button"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
        :class="theme.toggleButton"
        class="absolute right-2 top-1/2 transform -translate-y-1/2"
        @click="togglePasswordVisibility"
      >
        {{ showPassword ? 'Hide' : 'Show' }}
      </button>
    </div>
    <!-- if error -->
    <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
      {{ error }}
    </small>
  </div>
</template>

<style scoped>
/* Add specific styles if needed */
</style>
