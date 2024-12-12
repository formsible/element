<script setup lang="ts">
import {
    defineProps,
    defineEmits,
    computed,
    ref,
    onMounted,
    onBeforeUnmount,
    type PropType,
} from 'vue'
import WaveSurfer from 'wavesurfer.js'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import type { IFile, InputProperties, Validation } from '~/types'

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

const { t } = useI18n()
const message = ref<string>(props.error)

const files = defineModel<IFile[]>('files', { default: [] })

// Define emits
const emit = defineEmits(['remove'])

// States for recording and playback
const isRecording = ref(false)
const mediaRecorder = ref<MediaRecorder | null>(null)
const audioChunks = ref<Blob[]>([])
const audioBlob = ref<Blob | null>(null)
const audioUrl = ref<string | null>(null)
const waveSurfer = ref<WaveSurfer | null>(null)
const isPlaying = ref(false)
const recordingTime = ref(0)
const intervalId = ref<NodeJS.Timeout | null>(null)
const audioDuration = ref(0)

// Computed properties
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)

const maxFiles = computed(() => {
    const v = props.input?.validations?.find(
        (v: Validation) => v.rule == 'maxLength',
    )
    return v?.params ? parseInt(v.params[0]) : 1
})

const isAllowedToRecord = computed(() => {
    return files.value.length < maxFiles.value
})

// Formatting time for display
function formatTime(seconds: number) {
    return dayjs().startOf('day').second(seconds).format('mm:ss')
}

// Start recording
const startRecording = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const hasMicrophone = devices.some((device) => device.kind === 'audioinput')

    if (!hasMicrophone) {
        message.value = 'No microphone found on this device.'
        return
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        message.value = 'The browser does not support the getUserMedia API'
        return
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        })
        mediaRecorder.value = new MediaRecorder(stream)
        mediaRecorder.value.ondataavailable = (event: BlobEvent) => {
            audioChunks.value.push(event.data)
        }
        mediaRecorder.value.onstop = () => {
            audioBlob.value = new Blob(audioChunks.value, { type: 'audio/wav' })
            audioUrl.value = URL.createObjectURL(audioBlob.value)
            audioChunks.value = []

            if (waveSurfer.value) {
                waveSurfer.value.loadBlob(audioBlob.value)
                waveSurfer.value.on('ready', () => {
                    audioDuration.value = waveSurfer.value?.getDuration() || 0
                })
            }

            // Handle file selection after recording stops
            const recordedFile: IFile = {
                file: new File([audioBlob.value], 'recorded_audio.wav', {
                    type: 'audio/wav',
                }),
                status: 'queued',
                duration: audioDuration.value,
            }

            // Add to the list of files and limit to maximum allowed files
            files.value = files.value
                ?.concat([recordedFile])
                .slice(0, maxFiles.value)
        }

        mediaRecorder.value.start()
        isRecording.value = true

        // Start timer
        recordingTime.value = 0
        intervalId.value = setInterval(() => {
            recordingTime.value++
        }, 1000)
    } catch (err: any) {
        message.value = err.message
    }
}

// Stop recording
const stopRecording = () => {
    if (mediaRecorder.value) {
        mediaRecorder.value.stop()
        isRecording.value = false

        // Stop timer
        if (intervalId.value) {
            clearInterval(intervalId.value)
            intervalId.value = null
        }
    }
}

// Play/pause audio
const playAudio = () => {
    if (waveSurfer.value) {
        waveSurfer.value.playPause()
        isPlaying.value = !isPlaying.value
    }
}

// Remove recorded audio
const onFileRemove = (file: IFile) => {
    emit(
        'remove',
        files.value.find((_file) => _file.file.name === file.file.name),
    )
    files.value =
        files.value.filter((_file) => _file.file.name !== file.file.name) || []
}

// Setup WaveSurfer on component mount
onMounted(() => {
    waveSurfer.value = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#000',
        progressColor: '#009688',
        height: 40,
        barWidth: 4,
        barGap: 2,
        barRadius: 20,
    })

    waveSurfer.value.on('finish', () => {
        isPlaying.value = false
    })
})

// Cleanup on component unmount
onBeforeUnmount(() => {
    if (waveSurfer.value) {
        waveSurfer.value.destroy()
    }
    if (mediaRecorder.value) {
        mediaRecorder.value.stream.getTracks().forEach((track) => track.stop())
    }
    if (intervalId.value) {
        clearInterval(intervalId.value)
    }
})
</script>

<template>
    <div :class="theme.container">
        <label :class="theme.label" :for="input.key" class="font-semibold">
            {{ input.label }}
            <span v-if="isRequired" class="text-red-600 dark:text-red-400"
                >*</span
            >
        </label>
        <p class="text-gray-600 text-sm mb-3">{{ input.description }}</p>

        <div class="p-6 my-4 mb-10 bg-white dark:bg-zinc-800 rounded-lg border">
            <div class="w-full max-w-40 mx-auto grid place-items-center">
                <div
                    :class="[
                        'p-4 rounded-full w-20 h-20 flex items-center justify-center',
                        isRecording
                            ? 'bg-red-500 animate-pulse'
                            : 'bg-primary shadow-[0_4px_15px_rgba(16,185,129,0.2)]',
                        isPlaying ? 'cursor-not-allowed opacity-50' : '',
                    ]"
                >
                    <button
                        :disabled="isPlaying || !isAllowedToRecord || readonly"
                        @click="
                            isRecording ? stopRecording() : startRecording()
                        "
                    >
                        <iconify-icon
                            v-if="!isPlaying && !isRecording"
                            icon="ant-design:audio-filled"
                            class="text-white text-3xl"
                        ></iconify-icon>

                        <iconify-icon
                            v-if="isRecording"
                            icon="mynaui:pause-solid"
                            :class="[
                                'text-white text-3xl',
                                isPlaying
                                    ? 'cursor-not-allowed opacity-50'
                                    : '',
                            ]"
                        ></iconify-icon>
                    </button>
                </div>
                <div
                    :class="[
                        'mt-3 text-sm font-medium text-slate-600',
                        isPlaying ? 'cursor-not-allowed opacity-30' : '',
                    ]"
                >
                    <span v-if="!isRecording">{{ t('press-to-record') }}</span>
                    <span v-else>
                        {{ t('recording-time') }}:
                        {{ formatTime(recordingTime) }}
                    </span>
                </div>
            </div>

            <div
                id="waveform"
                :class="['mt-4', audioBlob ? '' : 'hidden']"
            ></div>

            <div
                class="mt-4 w-full max-w-40 mx-auto flex gap-3 items-center justify-center"
            >
                <Button
                    v-if="audioBlob"
                    :class="[
                        'px-4 py-2 mt-4 rounded-md flex items-center gap-1 bg-surface-200 hover:bg-surface-300 text-black',
                        isRecording ? 'pointer-events-none opacity-50' : '',
                    ]"
                    :disabled="isRecording"
                    @click="playAudio"
                >
                    <span v-if="!isPlaying">{{ t('btn:play') }}</span>
                    <span v-else>{{ t('btn:pause') }}</span>
                </Button>
            </div>
            <small
                v-if="message"
                :id="`${input.key}-help`"
                :class="theme.error"
            >
                {{ message }}
            </small>

            <!-- Display recorded files -->
            <div v-if="files.length > 0" class="mt-4">
                <FileCard
                    v-for="file in files"
                    :key="file.file.name"
                    :file="file"
                    @remove="onFileRemove(file)"
                />
            </div>
        </div>
    </div>
</template>
