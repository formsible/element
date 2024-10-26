<script setup lang="ts">
import type { DisplayProperties } from '../../types'
import { type PropType, defineProps, computed } from 'vue'

const props = defineProps({
    display: {
        type: Object as PropType<DisplayProperties>,
        required: true,
    },
    theme: {
        type: Object,
        default: () => ({
            h1: 'text-3xl font-bold text-gray-900 dark:text-gray-100',
            h2: 'text-2xl font-semibold text-gray-900 dark:text-gray-100',
            h3: 'text-xl font-semibold text-gray-900 dark:text-gray-100',
            h4: 'text-lg font-medium text-gray-900 dark:text-gray-100',
            h5: 'text-base font-medium text-gray-900 dark:text-gray-100',
            h6: 'text-sm font-medium text-gray-900 dark:text-gray-100',
            p: 'text-base text-gray-700 dark:text-gray-300',
            blockquote:
                'italic border-l-4 pl-4 text-gray-600 border-gray-300 dark:text-gray-400 dark:border-gray-600',
            ul: 'list-disc list-inside text-gray-700 dark:text-gray-300',
            ol: 'list-decimal list-inside text-gray-700 dark:text-gray-300',
            img: 'w-full max-w-full h-auto rounded',
            code: 'bg-surface-100 dark:bg-surface-800 p-2 rounded-md text-sm font-mono text-red-600 dark:text-red-400',
            pre: 'bg-surface-100 dark:bg-surface-800 p-4 rounded-md text-sm font-mono overflow-auto text-gray-800 dark:text-gray-200',
            hr: 'border-t border-gray-300 dark:border-gray-600 my-4',
            container: 'flex flex-col gap-4',
        }),
    },
})
const tag = computed(() => props.display.tag || 'p')
</script>

<template>
    <div :class="theme.container">
        <component
            :is="display.tag"
            :class="[theme[tag], display.size, display.color]"
        >
            <!-- List Rendering -->
            <template v-if="['ul', 'ol'].includes(tag)">
                <li v-for="(item, index) in display.items" :key="index">
                    {{ item }}
                </li>
            </template>
            <!-- Non-list Rendering -->
            <template v-else>
                {{ display.content }}
            </template>
        </component>

        <!-- Image Rendering -->
        <img
            v-if="display.tag === 'img'"
            :src="display.src"
            :alt="display.alt"
            :class="[theme.img, display.size, display.color]"
        />
    </div>
</template>
