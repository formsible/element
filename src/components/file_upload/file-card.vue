<script setup lang="ts">
import { defineProps, defineEmits, type PropType } from 'vue'
import fileSrc from '~/assets/images/file.png'
import videoSrc from '~/assets/images/video.png'
import { IFile } from '~/types'

defineProps({
    file: {
        type: Object as PropType<IFile>,
        required: true,
    },
})

defineEmits(['remove'])

const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
</script>

<template>
    <div class="py-2 rounded-md flex flex-row gap-3 w-full">
        <div class="flex-none w-12 h-12">
            <img
                v-if="file.file.type?.startsWith('image/') && file.url"
                :src="file.url"
                alt="File preview"
                class="h-full rounded-md w-full object-cover overflow-hidden border"
            />
            <img
                v-else-if="
                    file.file.type?.startsWith('video/') ||
                    (file.file.type?.startsWith('application') && file.url)
                "
                :src="videoSrc"
            />
            <img v-else :src="fileSrc" />
        </div>
        <div class="grow">
            <span
                class="line-clamp-1 break-all font-semibold self-center cursor-pointer hover:text-primary hover:underline w-full"
            >
                {{ file.file.name }}
            </span>
            <div class="text-sm text-gray-500 flex gap-2 items-center">
                <span>{{ file.file.type }}</span>
                <div class="h-1 w-1 rounded-full bg-gray-300"></div>

                <div>
                    <span class="mr-2">{{
                        formatFileSize(file.file.size)
                    }}</span>

                    <i
                        v-if="file.status == 'uploaded'"
                        class="pi pi-check text-green-500"
                    ></i>
                    <i
                        v-else-if="file.status == 'error'"
                        class="pi pi-exclamation-triangle text-red-500"
                    ></i>
                    <i
                        v-else-if="file.status === 'pending'"
                        class="pi pi-spinner text-blue-600 dark:text-blue-400 pi-spin"
                    ></i>
                    <i
                        v-else-if="file.status === 'queued'"
                        class="pi pi-hourglass text-yellow-600 dark:text-yellow-400"
                    ></i>
                    <iconify-icon-icon icon="mdi:account"></iconify-icon-icon>
                </div>
            </div>
        </div>
        <button class="pi pi-times-circle" @click="$emit('remove')" />
    </div>
</template>
