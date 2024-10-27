<script setup lang="ts">
import { defineModel, defineProps, type PropType } from 'vue'
import type { InputProperties } from '~/types'
import Select from 'primevue/select'

defineProps({
    input: {
        type: Object as PropType<InputProperties>,
        required: true,
    },
    theme: {
        type: Object,
        default: () => ({
            container: 'relative inline-block',
            button: 'flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-surface-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
            dropdown:
                'absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm',
            option: 'cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-surface-100',
            selectedOption: 'bg-indigo-600 text-white',
            flag: 'mr-3 h-5 w-5 rounded-full',
        }),
    },
})

const model = defineModel<string>({ default: '' })
</script>

<template>
    <div class="card flex justify-center">
        <Select
            v-model="model"
            :options="input.choices"
            option-label="label"
            placeholder="Select a Country"
            class="w-full md:w-56"
        >
            <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center">
                    <img
                        :alt="slotProps.value.label"
                        :src="slotProps.value.src"
                        :class="`mr-2 flag flag-${slotProps.value.value.toLowerCase()}`"
                        style="width: 18px"
                    />
                    <div>{{ slotProps.value.label }}</div>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
                <div class="flex items-center">
                    <img
                        :alt="slotProps.option.label"
                        :src="slotProps.option.src"
                        :class="`mr-2 flag flag-${slotProps.option.value.toLowerCase()}`"
                        style="width: 18px"
                    />
                    <div>{{ slotProps.option.label }}</div>
                </div>
            </template>
        </Select>
    </div>
</template>
