<script setup lang="ts">
import {
  defineProps,
  defineModel,
  defineEmits,
  computed,
  type PropType,
} from 'vue'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import FileCard from './file-card.vue'
import type { IFile, InputProperties, Validation } from '../../types'

// Define props
const props = defineProps({
  input: {
    type: Object as PropType<InputProperties>,
    required: true,
  },
  theme: {
    type: Object,
    default: () => ({
      container: '',
      label: 'w-full text-black dark:text-white',
      input: 'w-full',
      description: 'text-sm text-slate-700 dark:text-slate-300',
      error: 'text-red-600 dark:text-red-400',
    }),
  },
  error: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})
const files = defineModel<IFile[]>('files', { default: [] })
// Define emits
const emit = defineEmits(['select', 'remove'])

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

const isAllowedToUpload = computed(() => {
  return files.value.length < maxFiles.value
})

// Handle file selection
const onFileSelected = (event: { files: File[] }) => {
  const selectedFiles: IFile[] =
    event.files.map((file) => ({
      file,
      status: 'queued',
    })) || []
  emit('select', selectedFiles)
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
  <div :class="theme.container">
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
        <p>Accepted files: {{ accept }}, Limit: {{ maxFiles }}</p></template
      >
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

    <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
      {{ error }}
    </small>
  </div>
</template>
