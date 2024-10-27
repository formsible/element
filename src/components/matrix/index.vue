<script setup lang="ts">
import { defineProps, computed, type PropType, ref } from 'vue'
import type { InputProperties } from '../../../types'
import Checkbox from 'primevue/checkbox'

const props = defineProps({
    input: {
        type: Object as PropType<InputProperties>,
        required: true,
    },
    theme: {
        type: Object,
        default: () => ({
            container: 'flex flex-col gap-4',
            label: 'w-full',
            matrixContainer: 'flex flex-col gap-2',
            row: 'flex items-center gap-2',
            column: 'flex-1',
            checkbox: 'mr-2',
            description: 'text-sm text-slate-700 dark:text-slate-300',
            error: 'text-red-600',
        }),
    },
    error: {
        type: String,
        default: '',
    },
})

const model = ref<Record<string, string[]>>({})

const updateSelection = (row: string, value: string) => {
    if (!model.value[row]) {
        model.value[row] = []
    }

    const index = model.value[row].indexOf(value)
    if (index === -1) {
        model.value[row].push(value)
    } else {
        model.value[row].splice(index, 1)
    }
}
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
        <!-- Survey matrix -->
        <div :class="theme.matrixContainer">
            <div
                v-for="(row, rowIndex) in input.rows"
                :key="rowIndex"
                :class="theme.row"
            >
                <span class="flex-1">{{ row.label }}</span>
                <div
                    v-for="(column, colIndex) in input.columns"
                    :key="colIndex"
                    :class="theme.column"
                >
                    <Checkbox
                        :id="`${input.key}-${rowIndex}-${colIndex}`"
                        :value="column.value"
                        :checked="model.value[row.key]?.includes(column.value)"
                        v-bind="{ ...$attrs, ...input.props }"
                        @change="() => updateSelection(row.key, column.value)"
                    />
                    <label
                        :for="`${input.key}-${rowIndex}-${colIndex}`"
                        class="p-checkbox-label"
                    >
                        {{ column.label }}
                    </label>
                </div>
            </div>
        </div>
        <!-- if error -->
        <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
            {{ error }}
        </small>
    </div>
</template>
