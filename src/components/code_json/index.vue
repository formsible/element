<script setup lang="ts">
import {
    defineProps,
    ref,
    shallowRef,
    watch,
    nextTick,
    type PropType,
} from 'vue'
import type { InputProperties } from '~/types'
import type { EditorView } from '@codemirror/view'
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { useDebounce } from '@vueuse/core'

// Props
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
const model = defineModel<object>({ default: {} })
const code = ref('')
const view = shallowRef<EditorView | null>(null)
const updateFromCode = ref(false)
const lastValidJson = ref<any>(null)
const extensions: any[] = [json(), oneDark]

// Utilities
const validJSON = (json: string): boolean => {
    try {
        JSON.parse(json)
    } catch {
        return false
    }
    return true
}

const formatJson = () => {
    if (view.value) {
        try {
            const jsonString = view.value.state.doc.toString()
            if (!jsonString.trim()) throw new Error('Empty JSON input')

            const formatted = JSON.stringify(JSON.parse(jsonString), null, 2)
            if (formatted !== jsonString) {
                view.value.dispatch({
                    changes: {
                        from: 0,
                        to: view.value.state.doc.length,
                        insert: formatted,
                    },
                })
            }
        } catch (e: any) {
            console.error('[json-editor] Formatting error:', e.message)
        }
    }
}

// Debounce
const debouncedCode = useDebounce(code, 2000)
watch(debouncedCode, () => {
    if (validJSON(debouncedCode.value)) {
        updateFromCode.value = true
        nextTick(() => {
            model.value = JSON.parse(debouncedCode.value)
            lastValidJson.value = model.value
        })
    }
})

// Watch for model updates
watch(model, () => {
    if (!updateFromCode.value) {
        code.value = JSON.stringify(model.value, null, 2)
        lastValidJson.value = model.value
    }
    updateFromCode.value = false
})

// Handle editor setup and interactions
const handleReady = (payload: { view: EditorView }) => {
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
                :placeholder="input.placeholder || 'Enter your code'"
                :style="{ height: '400px' }"
                :autofocus="true"
                :indent-with-tab="true"
                :tab-size="2"
                :extensions="extensions"
                @ready="handleReady"
                @change="formatJson"
                @paste="formatJson"
                @blur="formatJson"
            />
        </div>
        <p v-if="error" :class="theme.error">{{ error }}</p>
    </div>
</template>
