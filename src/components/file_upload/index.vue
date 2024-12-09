<script setup lang="ts">
import FileUpload from 'primevue/fileupload'
// import Button from 'primevue/button'
import FileCard from './file-card.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { push } from 'notivue'
import type { IFile, InputProperties, Validation } from '~/types'

// Define props
interface Props {
    input: InputProperties
    readonly?: boolean
    error?: string
}
const props = withDefaults(defineProps<Props>(), {
    readonly: false,
})

const { t } = useI18n()

const files = defineModel<IFile[]>('files', { default: [] })
// Define emits
const emit = defineEmits(['remove'])

// Define computed properties
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)

const accept =
    'image/*,video/mp4,video/webm,video/ogg,application/vnd.apple.mpegurl,application/vnd.ms-windowsMedia,application/vnd.3gpp2'

const maxFiles = computed(() => {
    const v = props.input?.validations?.find(
        (v: Validation) => v.rule == 'maxLength',
    )
    return v?.params ? parseInt(v.params[0]) : 1
})

// Handle file selection
const maxFileSize = 50 * 1024 * 1024 // 50MB

const onFileSelected = (event: any) => {
    const selectedFiles: IFile[] =
        (Array.isArray(event.files) ? event.files : [event.files])
            .filter((file: any) => {
                if (file.size > maxFileSize) {
                    push.warning({
                        // message: t('notification.file_too_large'),
                        message: `File ${file.name} vượt quá giới hạn 25MB`,
                    })
                    return false
                }
                return true
            })
            .map((file: any) => {
                const fileURL = URL.createObjectURL(file)
                return {
                    file,
                    status: 'queued',
                    url: file.type.startsWith('image/') ? fileURL : '',
                }
            }) || []

    files.value = files.value?.concat(selectedFiles).slice(0, maxFiles.value)
}

// Handle file removal
const onFileRemove = (file: IFile) => {
    emit(
        'remove',
        files.value.find((_file) => _file.file.name === file.file.name),
    )
    files.value = files.value.filter(
        (_file) => _file.file.name !== file.file.name,
    )
}

// Handle file drop (drag & drop)
const handleDrop = (event: DragEvent) => {
    event.preventDefault()
    const files = event.dataTransfer?.files
    if (files) {
        onFileSelected({ files })
    }
}

// Prevent default dragover behavior to allow drop
const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
}
</script>

<template>
    <div>
        <p class="font-medium">
            {{ props.input.label }}
            <span v-if="isRequired" class="text-red-500">*</span>
        </p>
        <p class="mb-2 text-sm">{{ props.input.description }}</p>

        <FileUpload
            custom-upload
            @uploader="onFileSelected"
            auto
            :show-cancel-button="false"
            :show-upload-button="false"
            :multiple="maxFiles > 1"
            :accept="accept"
            v-bind="{ ...$attrs, ...input.props }"
        >
            <template #header="{ chooseCallback }">
                <div
                    class="w-full max-w-sm p-6 text-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-blue-50 transition-all"
                    @click="chooseCallback"
                    @drop="handleDrop"
                    @dragover="handleDragOver"
                    @dragleave="handleDragOver"
                >
                    <div
                        class="mb-3 flex items-center justify-center text-primary"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="3em"
                            height="3em"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M473.66 210c-14-10.38-31.2-18-49.36-22.11a16.11 16.11 0 0 1-12.19-12.22c-7.8-34.75-24.59-64.55-49.27-87.13C334.15 62.25 296.21 47.79 256 47.79c-35.35 0-68 11.08-94.37 32.05a150.1 150.1 0 0 0-42.06 53a16 16 0 0 1-11.31 8.87c-26.75 5.4-50.9 16.87-69.34 33.12C13.46 197.33 0 227.24 0 261.39c0 34.52 14.49 66 40.79 88.76c25.12 21.69 58.94 33.64 95.21 33.64h104V230.42l-36.69 36.69a16 16 0 0 1-23.16-.56c-5.8-6.37-5.24-16.3.85-22.39l63.69-63.68a16 16 0 0 1 22.62 0L331 244.14c6.28 6.29 6.64 16.6.39 22.91a16 16 0 0 1-22.68.06L272 230.42v153.37h124c31.34 0 59.91-8.8 80.45-24.77c23.26-18.1 35.55-44 35.55-74.83c0-29.94-13.26-55.61-38.34-74.19M240 448.21a16 16 0 1 0 32 0v-64.42h-32Z"
                            />
                        </svg>
                    </div>
                    <div class="font-medium">Kéo thả file vào đây</div>
                    <div class="text-sm text-gray-500 mt-2">
                        hoặc nhấn để chọn file
                    </div>
                </div>
            </template>

            <template #content>
                <FileCard
                    v-for="file in files"
                    :key="file.file.name"
                    :file="file"
                    class="mb-2"
                    @remove="onFileRemove(file)"
                />
            </template>
            <template #empty>
                <p class="text-sm text-gray-500">
                    {{ t('allowed_file_formats') }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                    {{ t('limit_max_files', { maxFiles: maxFiles }) }}
                </p>
            </template>
        </FileUpload>

        <small v-if="error" :id="`${input.key}-help`">
            {{ error }}
        </small>
    </div>
</template>
