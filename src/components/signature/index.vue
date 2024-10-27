<script setup lang="ts">
import type { InputProperties } from '~/types'
import type { PropType } from 'vue'
import { defineModel, computed, defineProps, onMounted, ref } from 'vue'
import SignaturePad from 'signature_pad'

const props = defineProps({
    input: {
        type: Object as PropType<InputProperties>,
        required: true,
    },
    theme: {
        type: Object,
        default: () => ({
            container: '',
            label: 'w-full',
            description: 'text-sm text-slate-700 dark:text-slate-300',
            error: 'text-red-600',
        }),
    },
})

const model = defineModel<string>({ default: '' })

const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)

const canvasRef = ref<HTMLCanvasElement | null>(null)
let signaturePad: SignaturePad | null = null

onMounted(() => {
    if (canvasRef.value) {
        signaturePad = new SignaturePad(canvasRef.value, {
            backgroundColor: 'rgba(255, 255, 255, 0)',
            penColor: 'rgb(0, 0, 0)',
        })

        // Listen to SignaturePad events to update the model with the signature data
        // signaturePad.onEnd = () => {
        //     model.value = signaturePad?.toDataURL() || ''
        // }
    }
})

const clearSignature = () => {
    if (signaturePad) {
        signaturePad.clear()
        model.value = ''
    }
}
</script>

<template>
    <div :class="theme.container">
        <label :class="theme.label">
            {{ input.label }}
            <span v-if="isRequired" class="text-red-600">*</span>
        </label>
        <p :class="theme.description">{{ input.description }}</p>

        <canvas
            id="signature-pad"
            ref="canvasRef"
            class="signature-pad"
            width="400"
            height="200"
        />

        <button
            type="button"
            class="mt-2 text-sm text-blue-500"
            @click="clearSignature"
        >
            Clear Signature
        </button>
    </div>
</template>
