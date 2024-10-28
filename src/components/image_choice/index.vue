<script setup lang="ts">
import { ref, computed } from 'vue'
import type { InputChoiceProperties } from '~/types'

interface Props {
    input: InputChoiceProperties
    error?: string
}
const props = defineProps<Props>()

const model = defineModel<string>({ default: '' })

const selected = ref<string>(model.value)
const selectImage = (value: string) => {
    selected.value = value
    model.value = value
}
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
</script>

<template>
    <div>
        <label :for="input.key">
            {{ input.label }}
            <span v-if="isRequired" class="text-red-600 dark:text-red-400"
                >*</span
            >
        </label>
        <p>{{ input.description }}</p>
        <!-- input section -->
        <div>
            <div
                v-for="option in input.choices"
                :key="option.value"
                class="relative flex flex-col items-center p-2 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
                @click="selectImage(option.value)"
            >
                <div
                    :class="[
                        'relative',
                        {
                            'absolute inset-0 border-4 border-blue-500 dark:border-blue-300 rounded-lg pointer-events-none':
                                selected === option.value,
                        },
                    ]"
                >
                    <img
                        :src="option.value"
                        :alt="option.label"
                        :class="[
                            'w-24 h-24 object-cover border-2 border-transparent rounded-lg',
                            {
                                ['border-blue-500 dark:border-blue-300']:
                                    selected === option.value,
                            },
                        ]"
                    />
                </div>
                <span class="mt-1 text-sm text-gray-800 dark:text-gray-200">{{
                    option.label
                }}</span>
            </div>
        </div>
        <!-- if error -->
        <small v-if="error" :id="`${input.key}-help`" class="text-red-500">{{
            error
        }}</small>
    </div>
</template>
