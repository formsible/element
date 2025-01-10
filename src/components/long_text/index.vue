<script setup lang="ts">
import { computed, defineModel, defineProps } from 'vue'
import type { InputProperties, Validation } from '~/types'
import TextArea from 'primevue/textarea'

interface Props {
    input: InputProperties
    error?: string
}
const props = defineProps<Props>()

const model = defineModel<string>({ default: '' })
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)

const charCount = computed(() => model.value?.length || 0)
const maxLength = computed(() => {
    const v = props.input?.validations?.find(
        (v: Validation) => v.rule == 'maxLength',
    )
    return v?.params ? parseInt(v.params[0]) : 1
})
</script>

<template>
    <div>
        <label :for="input.key" class="font-semibold">
            {{ input.label }}
            <span
                v-if="isRequired"
                class="text-red-600 dark:text-red-400 -ml-0.5"
                >*</span
            >
        </label>
        <p class="text-gray-600 text-sm mb-3">{{ input.description }}</p>
        <div class="mt-2">
            <TextArea
                :id="input.key"
                v-model="model"
                :input-id="input.key"
                v-bind="{ ...$attrs, ...input.props }"
                rows="5"
                :placeholder="input.placeholder"
                :maxlength="maxLength"
                fluid
            />
            <div class="flex justify-end mt-1">
                <span class="text-sm text-gray-500">
                    {{ charCount }}/{{ maxLength }}
                </span>
            </div>
        </div>
        <small
            v-if="error"
            :id="`${input.key}-help`"
            class="text-sm mt-0.5 text-red-600"
        >
            {{ error }}
        </small>
    </div>
</template>
