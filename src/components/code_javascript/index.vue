<script setup lang="ts">
import { ref, shallowRef, watch, nextTick, Ref } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { useDebounce } from '@vueuse/core'

// Props
const props = defineProps({
  input: {
    type: Object,
    required: true,
  },
  theme: {
    type: Object,
    default: () => ({
      container: '',
      label: 'font-medium',
      input: '',
      description: 'text-sm mb-2',
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

// Model & State Management
const model = defineModel({ default: '' })
const code = ref('')
const view = shallowRef(null)
const updateFromCode = ref(false)
const lastValidCode: Ref<string | null> = ref(null)
const extensions = [javascript(), oneDark]

// Utilities
const validJavaScript = (code: string) => {
  try {
    new Function(code)
  } catch {
    return false
  }
  return true
}

// Debounce
const debouncedCode = useDebounce(code, 2000)
watch(debouncedCode, () => {
  if (validJavaScript(debouncedCode.value)) {
    updateFromCode.value = true
    nextTick(() => {
      model.value = debouncedCode.value
      lastValidCode.value = model.value
    })
  }
})

// Watch for model updates
watch(model, () => {
  if (!updateFromCode.value) {
    code.value = model.value
    lastValidCode.value = model.value
  }
  updateFromCode.value = false
})

// Handle editor setup and interactions
const handleReady = (payload: any) => {
  view.value = payload.view
}
</script>

<template>
  <div>
    <p class="font-medium">{{ props.input.label }}</p>
    <p class="mb-2 text-sm">{{ props.input.description }}</p>

    <div class="rounded overflow-hidden">
      <Codemirror
        v-model="code"
        :disabled="readonly"
        :placeholder="props.input.placeholder || 'Enter your JavaScript code'"
        :style="{ height: '400px' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        @ready="handleReady"
      />
    </div>
    <p v-if="props.error" :class="theme.error">{{ props.error }}</p>
  </div>
</template>
