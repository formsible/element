<script setup lang="ts">
import { PropType, ref, watch, type Ref } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DragIcon from '~icons/material-symbols/drag-handle'
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
      container: 'flex flex-col gap-2',
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

useSortable(listEl, list, {
  handle: '.handle',
  animation: 150,
})

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
    <div ref="listEl" class="flex flex-col gap-3 justify-center">
      <div
        v-for="(item, index) in list"
        :key="item.id"
        class="flex flex-row gap-2 items-center"
      >
        <InputText v-model="list[index].label" placeholder="Label" />
        <DragIcon class="handle cursor-move"></DragIcon>
        <button @click="removeItem(index)">
          <TrashIcon />
        </button>
      </div>
    </div>

    <Button
      label="Add Item"
      severity="secondary"
      class="mt-3"
      @click="addItem"
    />
  </div>
</template>
