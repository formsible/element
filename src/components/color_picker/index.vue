<script setup lang="ts">
import { defineProps, type PropType, ref, computed } from 'vue'
import type { InputProperties } from '../../types'
import ColorPicker from 'primevue/colorpicker'

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
      colorPicker: 'w-full',
      description: 'text-sm text-slate-700 dark:text-slate-300',
      error: 'text-red-600',
    }),
  },
  error: {
    type: String,
    default: '',
  },
})

const model = ref<string>('')

const handleColorChange = (color: { hex: string }) => {
  model.value = color.hex
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
    <!-- Color Picker -->
    <ColorPicker
      v-model="model"
      :class="theme.colorPicker"
      v-bind="{ ...$attrs, ...props.input.props }"
      @input="handleColorChange"
    />
    <!-- if error -->
    <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
      {{ error }}
    </small>
  </div>
</template>
