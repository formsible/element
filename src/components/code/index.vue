<script setup lang="ts">
import { defineProps, ref, shallowRef, type PropType } from 'vue'
import type { InputProperties } from '../../types'
import type { EditorView } from '@codemirror/view'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

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

const extensions: any[] = [oneDark]
// const code = defineModel<string>({ default: '' })
const code = ref(`console.log('Hello, world!')`)

const view = shallowRef<EditorView | null>(null)
const handleReady = (payload: any) => {
  console.log('Handle ready', payload)
  view.value = payload.view
}
</script>

<template>
  <div>
    <p :class="theme.label">{{ props.input.label }}</p>
    <p :class="theme.description">{{ props.input.description }}</p>
    <div>
      <Codemirror
        v-model="code"
        placeholder="Code goes here..."
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
