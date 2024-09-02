<script setup lang="ts">
import { defineProps, ref, shallowRef, watch, type PropType } from 'vue'
import type { InputProperties } from '../../types'
import type { EditorView } from '@codemirror/view'
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { useDebounce } from '@vueuse/core'

const props = defineProps({
  input: {
    type: Object as PropType<InputProperties>,
    required: true,
  },
  theme: {
    type: Object,
    default: () => ({
      container: '',
      label: 'font-medium',
      input: '',
      description: 'text-sm',
      error: 'text-red-600 dark:text-red-400',
    }),
  },
  error: {
    type: String,
    default: '',
  },
})

const model = defineModel<object>({ default: {} })
const code = ref('')

const extensions: any[] = [json(), oneDark]
const view = shallowRef<EditorView | null>(null)
const handleReady = (payload: any) => {
  console.log('Handle ready', payload)
  view.value = payload.view
}

// Utililties
const validJSON = (json: string): boolean => {
  try {
    JSON.parse(code.value)
  } catch (error) {
    return false
  }
  return true
}

// Debounce
const debouncedCode = useDebounce(code, 2000)
watch(debouncedCode, () => {
  if (validJSON(debouncedCode.value)) {
    model.value = JSON.parse(debouncedCode.value)
  }
})
</script>

<template>
  <div>
    <p :class="theme.label">{{ props.input.label }}</p>
    <p :class="theme.description">{{ props.input.description }}</p>
    <div>
      <Codemirror
        v-model="code"
        :placeholder="input.placeholder || 'Enter your code'"
        :style="{ height: '400px' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        @ready="handleReady"
        @change="console.log('change', $event)"
        @focus="console.log('focus', $event)"
        @blur="console.log('blur', $event)"
      />
    </div>
  </div>
</template>
