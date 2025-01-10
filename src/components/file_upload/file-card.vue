<script setup lang="ts">
import { defineProps, defineEmits, type PropType, ref, watch } from 'vue'
import fileSrc from '~/assets/images/file.png'
import videoSrc from '~/assets/images/video.png'
import { IFile } from '~/types'

const { file } = defineProps({
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

const imageUrl = ref(file.url)

const refreshImage = () => {
    if (file.url) {
        imageUrl.value = `${file.url}?t=${Date.now()}`
    }
}

watch(
    () => [file.url, file.status],
    ([newUrl, newStatus]) => {
        if (newUrl && newStatus === 'uploaded') {
            refreshImage()
        }
    },
    { immediate: true },
)
</script>

<template>
    <div class="py-2 rounded-md flex flex-row gap-3 w-full">
        <div class="flex-none w-12 h-12">
            <img
                v-if="file.file.type?.startsWith('image/') && file.url"
                :src="imageUrl"
                alt="File preview"
                class="h-full rounded-md w-full object-cover overflow-hidden border"
            />
            <img
                v-else-if="file.file.type?.startsWith('video/') && file.url"
                :src="videoSrc"
                alt="Video preview"
                class="h-full rounded-md w-full object-cover overflow-hidden border"
            />
            <img v-else :src="fileSrc" alt="File icon" />
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
                <div class="flex items-center">
                    <span class="mr-2">{{
                        formatFileSize(file.file.size)
                    }}</span>
                    <i
                        v-if="file.status === 'uploaded'"
                        class="pi pi-check text-green-500"
                    ></i>
                    <i
                        v-else-if="file.status === 'error'"
                        class="pi pi-exclamation-triangle text-red-500"
                    ></i>
                    <i
                        v-else-if="file.status === 'pending'"
                        class="pi pi-spinner text-blue-600 dark:text-blue-400 pi-spin"
                    ></i>
                    <!-- Thay thế icon đồng hồ cát bằng dots loader -->
                    <div
                        v-else-if="file.status === 'queued'"
                        class="dots-loader"
                    >
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
            <!-- Progress bar with gradient -->
            <div
                v-if="file.status === 'pending' || file.status === 'queued'"
                class="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden"
            >
                <div
                    class="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 background-animate"
                    :class="{
                        'animate-progress': file.status === 'pending',
                        'w-0': file.status === 'queued',
                    }"
                ></div>
            </div>
        </div>
        <button
            class="pi pi-times-circle"
            @click="$emit('remove')"
            aria-label="Remove file"
        ></button>
    </div>
</template>

<style scoped>
@keyframes progress {
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
}

.animate-progress {
    animation: progress 2s ease-in-out infinite;
}

/* Dots loader animation */
.dots-loader {
    display: flex;
    align-items: center;
    gap: 2px;
    height: 16px;
}

.dots-loader div {
    width: 4px;
    height: 4px;
    background-color: #4b5563;
    border-radius: 50%;
    animation: dots 1.4s infinite ease-in-out;
}

.dots-loader div:nth-child(1) {
    animation-delay: -0.32s;
}

.dots-loader div:nth-child(2) {
    animation-delay: -0.16s;
}

@keyframes dots {
    0%,
    80%,
    100% {
        transform: scale(0);
    }
    40% {
        transform: scale(1);
    }
}

/* Gradient animation for progress bar */
.background-animate {
    background-size: 200%;
    animation: gradient 2s linear infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
