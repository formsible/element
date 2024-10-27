<script setup lang="ts">
import { ref, computed, defineModel, defineProps, type PropType } from 'vue'
import type { InputProperties } from '~/types'

const props = defineProps({
    input: {
        type: Object as PropType<InputProperties>,
        required: true,
    },
    theme: {
        type: Object,
        default: () => ({
            container: '',
            label: 'w-full text-lg font-semibold text-gray-900 dark:text-gray-100',
            input: 'w-full flex flex-wrap gap-2',
            description: 'text-sm text-gray-700 dark:text-gray-300',
            error: 'text-red-600 dark:text-red-400',
            imageOption:
                'relative flex flex-col items-center p-2 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105',
            image: 'w-24 h-24 object-cover border-2 border-transparent rounded-lg',
            imageSelected: 'border-blue-500 dark:border-blue-300',
            selectedOverlay:
                'absolute inset-0 border-4 border-blue-500 dark:border-blue-300 rounded-lg pointer-events-none',
        }),
    },
    error: {
        type: String,
        default: '',
    },
})

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
    <div :class="theme.container">
        <label :class="theme.label" :for="input.key">
            {{ input.label }}
            <span v-if="isRequired" class="text-red-600 dark:text-red-400"
                >*</span
            >
        </label>
        <p :class="theme.description">{{ input.description }}</p>
        <!-- input section -->
        <div :class="theme.input">
            <div
                v-for="option in input.choices"
                :key="option.value"
                :class="theme.imageOption"
                @click="selectImage(option.value)"
            >
                <div
                    :class="[
                        'relative',
                        { [theme.selectedOverlay]: selected === option.value },
                    ]"
                >
                    <img
                        :src="option.value"
                        :alt="option.label"
                        :class="[
                            theme.image,
                            {
                                [theme.imageSelected]:
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
        <small v-if="error" :id="`${input.key}-help`" :class="theme.error">{{
            error
        }}</small>
    </div>
</template>

<style scoped>
.imageOption {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}
</style>
