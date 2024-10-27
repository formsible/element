<script setup lang="ts">
import FileUpload from 'primevue/fileupload'
import type { FileUploadUploaderEvent } from 'primevue/fileupload'
import Button from 'primevue/button'
import FileCard from './file-card.vue'
import type { IFile, InputProperties, Validation } from '~/types'
import { computed } from 'vue'

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
// Define emits
const emit = defineEmits(['remove'])

// Define computed properties
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)

const accept = 'image/*'

const maxFiles = computed(() => {
    const v = props.input?.validations?.find(
        (v: Validation) => v.rule == 'maxLength',
    )
    return v?.params ? parseInt(v.params[0]) : 1
})

// Handle file selection
const onFileSelected = (event: FileUploadUploaderEvent) => {
    const selectedFiles: IFile[] =
        (Array.isArray(event.files) ? event.files : [event.files]).map(
            (file: any) => ({
                file,
                status: 'queued',
            }),
        ) || []
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
                <Button
                    label="Upload"
                    icon="pi pi-upload"
                    @click="chooseCallback"
                    :disabled="readonly"
                />
                <p>Accepted files: {{ accept }}, Limit: {{ maxFiles }}</p>
            </template>
            <template #empty>
                <span>Drag and drop files to here to upload.</span> </template
            ><template #content>
                <FileCard
                    v-for="file in files"
                    :key="file.file.name"
                    :file="file"
                    class="mb-2"
                    @remove="onFileRemove(file)"
                />
            </template>
        </FileUpload>

        <small v-if="error" :id="`${input.key}-help`">
            {{ error }}
        </small>
    </div>
</template>
