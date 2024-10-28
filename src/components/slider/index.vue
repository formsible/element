<script setup lang="ts">
import { computed } from 'vue'
import InputSlider from 'primevue/slider'
import type { InputProperties } from '~/types'

interface Props {
    input: InputProperties
    error?: string
    readonly?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    readonly: false,
})

const model = defineModel<number>()

const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
</script>

<template>
    <div>
        <label :for="input.key">
            {{ props.input.label }}
            <span v-if="isRequired" class="text-red-500">*</span>
        </label>
        <p>{{ props.input.description }}</p>

        <!-- input section -->
        <InputSlider
            :id="input.key"
            v-model="model"
            :input-id="input.key"
            :disabled="readonly"
            v-bind="input.props"
        />
        <!-- if error -->
        <small v-if="error" :id="`${input.key}-help`" class="text-red-500">{{
            error
        }}</small>
    </div>
</template>
