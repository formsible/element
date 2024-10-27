<script setup lang="ts">
import { defineProps, type PropType, ref, computed } from 'vue'
import type { InputProperties } from '../../../types'
import Editor from '@tinymce/tinymce-vue'

const props = defineProps({
    input: {
        type: Object as PropType<InputProperties>,
        required: true,
    },
    theme: {
        type: Object,
        default: () => ({
            container: '',
            label: 'w-full',
            description: 'text-sm text-slate-700 dark:text-slate-300',
            error: 'text-red-600',
        }),
    },
    error: {
        type: String,
        default: '',
    },
})

const model = ref<string>('')
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
        <!-- Rich text editor section -->
        <Editor
            :id="input.key"
            v-model="model"
            :init="{
                menubar: false,
                plugins: 'link image lists',
                toolbar:
                    'undo redo | bold italic | alignleft aligncenter alignright | code',
                height: 300,
            }"
            :class="theme.input"
        />
        <!-- if error -->
        <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
            {{ error }}
        </small>
    </div>
</template>

<style scoped>
/* Add any additional styles if needed */
</style>
