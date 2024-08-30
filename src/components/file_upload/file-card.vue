<script setup lang="ts">
import { defineProps, defineEmits, type PropType } from 'vue'
import Button from 'primevue/button'
import { IFile } from '../../types'

defineProps({
  file: {
    type: Object as PropType<IFile>,
    required: true,
  },
})

defineEmits(['remove'])
</script>

<template>
  <div
    class="p-2 bg-gray-100 dark:bg-gray-800 rounded-md flex flex-row items-center gap-2 w-full"
  >
    <div class="flex items-center gap-2 min-w-0 flex-grow">
      <img
        v-if="file.file.type?.startsWith('image/') && file.url"
        :src="file.url"
        alt="File preview"
        class="h-8 w-8 object-cover overflow-hidden"
      />
      <i v-else class="pi pi-file self-start mt-1 flex-shrink-0"></i>
      <h6
        class="truncate self-center cursor-pointer hover:text-primary hover:underline min-w-0 flex-grow"
      >
        {{ file.file.name }}
      </h6>
    </div>
    <div class="flex items-center gap-2 flex-shrink-0">
      <i
        v-if="file.status == 'uploaded'"
        class="pi pi-check text-green-500"
      ></i>

      <i
        v-if="file.status == 'error'"
        class="pi pi-exclamation-triangle text-red-500"
      ></i>

      <i
        v-if="file.status === 'pending'"
        class="pi pi-spinner text-blue-600 dark:text-blue-400 pi-spin"
      ></i>

      <i
        v-if="file.status === 'queued'"
        class="pi pi-hourglass text-yellow-600 dark:text-yellow-400"
      ></i>

      <Button text plain icon="pi pi-times-circle" @click="$emit('remove')" />
    </div>
  </div>
</template>
