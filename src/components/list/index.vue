<script setup lang="ts">
import { PropType, ref, watch, type Ref } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DragIcon from '~icons/material-symbols/drag-pan-rounded'
import TrashIcon from '~icons/material-symbols/delete'
import { InputProperties } from '~/types'

const props = defineProps({
  input: {
    type: Object as PropType<InputProperties>,
    required: true,
  },
  theme: {
    type: Object,
    default: () => ({
      container: '',
      label: 'w-full text-black dark:text-white', // Added text color for label
      input: 'w-full h-32 bg-white dark:bg-gray-800 text-black dark:text-white', // Added background and text color for TextArea
      description: 'text-sm text-slate-700 dark:text-slate-300',
      error: 'text-red-600 dark:text-red-400', // Added dark mode color for error
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
const model = defineModel<string[]>({ default: [] })

const list: Ref<{ label: string; id: string }[]> = ref([])
const listEl: Ref<HTMLElement | null> = ref(null)

watch(
  () => props.input.props,
  () => {
    list.value = (props.input?.props?.items || []).map((i) => {
      return {
        id: crypto.randomUUID(),
        label: i,
      }
    })
  },
  { immediate: true },
)
watch(
  list,
  () => {
    model.value = list.value.map((i) => i.label).filter((i) => !!i)
  },
  { deep: true, immediate: true },
)

if (!props.readonly) {
  useSortable(listEl, list, {
    handle: '.handle',
    animation: 150,
  })
}

const removeItem = (index: number) => {
  list.value.splice(index, 1)
}

const addItem = () => {
  list.value.push({
    id: crypto.randomUUID(),
    label: '',
  })
}
</script>

<template>
  <div>
    <p class="font-medium">{{ props.input.label }}</p>
    <p class="mb-2 text-sm">{{ props.input.description }}</p>
    <div ref="listEl" class="flex flex-col gap-3 justify-center">
      <div
        v-for="(item, index) in list"
        :key="item.id"
        class="flex flex-row items-center"
      >
        <InputText
          v-model="list[index].label"
          placeholder="Label"
          :readonly="readonly"
          class="mr-2"
        />
        <DragIcon
          :class="[
            { '!handle !cursor-move': !readonly },
            'text-xl text-slate-400 dark:text-slate-600',
          ]"
        />
        <Button
          text
          size="small"
          plain
          :disabled="props.readonly"
          @click="removeItem(index)"
        >
          <TrashIcon />
        </Button>
      </div>
    </div>

    <Button
      label="Add Item"
      severity="secondary"
      class="mt-3"
      size="small"
      :disabled="readonly"
      @click="addItem"
    />
  </div>
</template>
