<script setup lang="ts">
import type { PropType } from 'vue'
import { ref, defineProps, defineEmits, computed, watch } from 'vue'
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import countryCodes from '../../assets/country-codes.json' // Adjust the path as needed
import type { InputProperties } from '../../types'

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
      countryCode: 'w-25',
      phoneInput: 'flex-1',
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

// Define emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update:phoneNumber', value: string): void
  (e: 'update:countryCode', value: string): void
}>()

// Define local state for the model
const model = ref({
  countryCode: props.input.props?.countryCode || '1',
  phoneNumber: props.input.props?.phoneNumber,
})

// Computed property for combined value
const combinedModelValue = computed(
  () => `${model.value.countryCode}${model.value.phoneNumber}`,
)

// Watch and emit changes for combined model value
watch(
  () => combinedModelValue.value,
  (newValue) => {
    emit('update:modelValue', newValue)
  },
)

// Watch and emit changes for phoneNumber
watch(
  () => model.value.phoneNumber,
  (newValue) => {
    if (newValue) emit('update:phoneNumber', newValue)
  },
)

// Watch and emit changes for countryCode
watch(
  () => model.value.countryCode,
  (newValue) => {
    emit('update:countryCode', newValue as string)
  },
)
const isRequired = computed(() =>
  props.input.validations?.map((v) => v.rule).includes('required'),
)
</script>

<template>
  <div :class="props.theme.container">
    <label :class="props.theme.label" :for="props.input.key">
      {{ props.input.label }}
      <span v-if="isRequired" class="text-red-600 dark:text-red-400">*</span>
    </label>
    <p :class="theme.description">{{ input.description }}</p>
    <div class="space-x-2">
      <Select
        v-model="model.countryCode"
        :options="countryCodes"
        option-label="label"
        option-value="value"
        :class="props.theme.countryCode"
        :input-id="props.input.key"
        v-bind="{ ...$attrs, ...input.props }"
      />
      <InputNumber
        :id="props.input.key"
        v-model="model.phoneNumber"
        :input-id="props.input.key"
        :class="props.theme.phoneInput"
        :placeholder="props.input?.placeholder || 'Enter phone number'"
        mode="decimal"
        :min="10"
        :use-grouping="false"
      />
    </div>
    <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
      {{ error }}
    </small>
  </div>
</template>
