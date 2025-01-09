<script setup lang="ts">
import FileUpload from 'primevue/fileupload'
import FileCard from './file-card.vue'
import { computed, ref } from 'vue'
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

const files = defineModel<IFile[]>('files', { default: [] })
const isFileOverLimit = ref(false)
// Define emits
const emit = defineEmits(['remove'])

// Define computed properties
const isRequired = computed(() =>
    props.input?.validations?.map((v) => v.rule).includes('required'),
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
const maxFileSize = computed(() => {
    const maxSizeRule: any = props.input?.validations?.find(
        (v) => v.rule === 'maxFileSize',
    )
    return {
        exceedMessage: maxSizeRule?.exceedMessage,
        constraintMessage: maxSizeRule?.constraintMessage,
        size: (maxSizeRule?.params?.[0] || 1) * 1024 * 1024,
    }
})

const onFileSelected = (event: any) => {
    const selectedFiles: IFile[] =
        (Array.isArray(event.files) ? event.files : [event.files])
            .filter((file: any) => {
                if (file.size > maxFileSize.value?.size) {
                    isFileOverLimit.value = true
                    setTimeout(() => {
                        isFileOverLimit.value = false
                    }, 4000)
                    console.log(
                        `File ${file.name} vượt quá giới hạn ${maxFileSize.value?.size}`,
                    )
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
    isFileOverLimit.value = false
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
                                fill-rule="evenodd"
                                d="M14.25 2.5a.25.25 0 0 0-.25-.25H7A2.75 2.75 0 0 0 4.25 5v14A2.75 2.75 0 0 0 7 21.75h10A2.75 2.75 0 0 0 19.75 19V9.147a.25.25 0 0 0-.25-.25H15a.75.75 0 0 1-.75-.75zm-.219 10.836a.75.75 0 0 0 .938-1.172l-2.494-1.995a.75.75 0 0 0-.473-.169h-.008a.75.75 0 0 0-.465.166l-2.497 1.998a.75.75 0 0 0 .937 1.172l1.281-1.026v3.44a.75.75 0 1 0 1.5 0v-3.44z"
                                clip-rule="evenodd"
                            />
                            <path
                                fill="currentColor"
                                d="M15.75 2.824c0-.184.193-.301.336-.186q.182.147.323.342l3.013 4.197c.068.096-.006.22-.124.22H16a.25.25 0 0 1-.25-.25z"
                            />
                        </svg>
                    </div>
                    <div class="font-medium">{{ props.input.description }}</div>
                    <div class="mt-2 text-gray-500 text-sm transition-all">
                        <p v-if="isFileOverLimit">
                            <i
                                class="pi pi-exclamation-triangle text-red-500 mr-1"
                            ></i>
                            <span>{{ maxFileSize?.exceedMessage }}</span>
                        </p>
                        <p v-else-if="maxFileSize?.constraintMessage">
                            <i class="pi pi-info-circle mr-1"></i>
                            <span>{{ maxFileSize?.constraintMessage }}</span>
                        </p>
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
                <!-- <p class="text-sm text-gray-500">
                    {{ t('allowed-file-formats') }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                    {{ t('limit-max-files', { maxFiles: maxFiles }) }}
                </p> -->
            </template>
        </FileUpload>

        <small v-if="error" :id="`${input.key}-help`">
            {{ error }}
        </small>
    </div>
</template>
