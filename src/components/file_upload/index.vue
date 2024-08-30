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
      container: 'flex flex-col gap-2',
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
})
const files = defineModel<IFile[]>('files', { default: [] })
// Define emits
const emit = defineEmits(['select', 'remove'])

// Define computed properties
const isRequired = computed(() =>
  props.input.validations?.map((v) => v.rule).includes('required')
)

const accept = 'image/*'

const maxFiles = computed(() => {
  const v = props.input?.validations?.find(
    (v: Validation) => v.rule == 'maxLength'
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
    files.value.find((_file) => _file.file.name === file.file.name)
  )
  files.value = files.value.filter(
    (_file) => _file.file.name !== file.file.name
  )
}
</script>

<template>
  <div :class="theme.container">
    <label :class="theme.label" :for="input.key">
      {{ input.label }}
      <span v-if="isRequired" class="text-red-600 dark:text-red-400">*</span>
    </label>
    <p :class="theme.description">{{ input.description }}</p>
    <FileUpload
      :auto="true"
      :show-upload-button="false"
      :show-cancel-button="false"
      custom-upload
      :multiple="maxFiles > 1"
      :accept="accept"
      :pt="{
        buttonbar: 'flex flex-row',
        content: 'flex flex-col-reverse my-3',
      }"
      @uploader="onFileSelected"
      v-bind="{ ...$attrs, ...input.props }"
    >
      <template #header="{ chooseCallback }">
        <Button
          severity="secondary"
          :disabled="!isAllowedToUpload"
          @click="chooseCallback"
          v-bind="{ ...$attrs, ...input.props }"
        >
          <div class="flex flex-col py-2">
            <i class="pi pi-upload text-xl"></i>
            <p class="text-lg mt-2 font-semibold">Choose a file to upload</p>
            <small> Accepted files: {{ accept }} </small>
            <small> Limit: {{ maxFiles }} </small>
          </div>
        </Button>
      </template>
      <template #content>
        <FileCard
          v-for="file in files"
          :key="file.file.name"
          :file="file"
          @remove="onFileRemove(file)"
        />
      </template>
    </FileUpload>
    <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
      {{ error }}
    </small>
  </div>
</template>
