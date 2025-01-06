<script setup lang="ts">
import FileUpload from 'primevue/fileupload'
import FileCard from './file-card.vue'
import { computed } from 'vue'
import type { IFile, InputProperties, Validation } from '~/types'

// Define props
interface Props {
    input: InputProperties
    readonly?: boolean
    error?: string
    maxFileSize?: number // maxFileSize passed from parent
}
const props = withDefaults(defineProps<Props>(), {
    readonly: false,
    maxFileSize: 30 * 1024 * 1024, // Default value if parent does not provide one
})

const files = defineModel<IFile[]>('files', { default: [] })
// Define emits
const emit = defineEmits(['remove', 'file-too-large', 'files-updated'])

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
const onFileSelected = (event: any) => {
    const selectedFiles: IFile[] =
        (Array.isArray(event.files) ? event.files : [event.files])
            .filter((file: any) => {
                if (file.size > props.maxFileSize) {
                    // Handle warning via parent-provided method or other means
                    console.warn(
                        `File ${file.name} exceeds size limit of ${props.maxFileSize / (1024 * 1024)}MB`,
                    )
                    emit('file-too-large', file)
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
    emit('files-updated', selectedFiles)
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
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M10 16h4c.55 0 1-.45 1-1v-5h1.59c.89 0 1.34-1.08.71-1.71L12.71 3.7a.996.996 0 0 0-1.41 0L6.71 8.29c-.63.63-.19 1.71.7 1.71H9v5c0 .55.45 1 1 1m-4 2h12c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1"
                            />
                        </svg>
                    </div>
                    <div class="font-medium">Nhấn để chọn file</div>
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
                <!-- Optional empty state content -->
            </template>
        </FileUpload>

        <small v-if="error" :id="`${input.key}-help`">
            {{ error }}
        </small>
    </div>
</template>
