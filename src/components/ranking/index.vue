<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import type { InputChoiceProperties } from '~/types'

interface Props {
    input: InputChoiceProperties
    error?: string
    readonly?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    readonly: false,
})

const el = ref<HTMLElement | null>(null)
const model = defineModel<string[]>({
    required: true,
})

if (!props.readonly) {
    useSortable(el, model, {
        handle: '.handle',
        animation: 150,
    })
}

// Sync items with props to handle external changes
watch(
    () => props.input.choices,
    (newChoices) => {
        if (newChoices) model.value = newChoices.map((el) => el.label)
    },
    { immediate: true },
)
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
</script>

<template>
    <div>
        <label :for="input.key">
            {{ input.label }}
            <span v-if="isRequired" class="text-red-600">*</span>
        </label>
        <p>{{ input.description }}</p>
        <!-- input section -->
        <div ref="el" class="flex flex-col gap-3">
            <div
                v-for="item in model"
                :key="item"
                class="p-2 bg-surface-100 rounded dark:bg-surface-900"
            >
                <i class="handle">☰</i>
                {{ item }}
            </div>
        </div>
        <!-- if error -->
        <small v-if="error" :id="`${input.key}-help`" class="text-red-500">
            {{ error }}
        </small>
    </div>
</template>
