<script setup lang="ts">
import type { PropType } from 'vue'
import { defineProps, ref, computed } from 'vue'
import type { InputProperties } from '../../types'

const props = defineProps({
  input: {
    type: Object as PropType<InputProperties>,
    required: true,
  },
  theme: {
    type: Object,
    default: () => ({
      container: 'flex flex-col gap-2',
      label: 'w-full',
      description: 'text-sm text-slate-700 dark:text-slate-300',
      error: 'text-red-600',
      controls: 'flex gap-2',
      audio: 'mt-2',
    }),
  },
  error: {
    type: String,
    default: '',
  },
})

const isRecording = ref(false)
const audioUrl = ref<string | null>(null)
const mediaRecorder = ref<MediaRecorder | null>(null)
const chunks = ref<Blob[]>([])

const startRecording = () => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder.value = new MediaRecorder(stream)
      mediaRecorder.value.ondataavailable = (event) => {
        chunks.value.push(event.data)
      }
      mediaRecorder.value.onstop = () => {
        const blob = new Blob(chunks.value, { type: 'audio/wav' })
        audioUrl.value = URL.createObjectURL(blob)
        chunks.value = []
      }
      mediaRecorder.value.start()
      isRecording.value = true
    })
  }
}

const stopRecording = () => {
  if (mediaRecorder.value) {
    mediaRecorder.value.stop()
    isRecording.value = false
  }
}
const isRequired = computed(() =>
  props.input.validations?.map((v) => v.rule).includes('required')
)
</script>

<template>
  <div :class="theme.container">
    <label :class="theme.label" :for="input.key">
      {{ input.label }}
      <span v-if="isRequired" class="text-red-600">*</span>
    </label>
    <p :class="theme.description">{{ input.description }}</p>
    <!-- Recording controls -->
    <div :class="theme.controls">
      <button
        :disabled="isRecording"
        class="btn btn-primary"
        @click="startRecording"
      >
        Start Recording
      </button>
      <button
        :disabled="!isRecording"
        class="btn btn-secondary"
        @click="stopRecording"
      >
        Stop Recording
      </button>
    </div>
    <!-- Playback audio -->
    <div v-if="audioUrl" :class="theme.audio">
      <audio controls :src="audioUrl" />
    </div>
    <!-- if error -->
    <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
      {{ error }}
    </small>
  </div>
</template>

<style scoped>
/* Add any additional styles if needed */
.btn {
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}
.btn-primary {
  background-color: #007bff;
  color: white;
}
.btn-secondary {
  background-color: #6c757d;
  color: white;
}
</style>
