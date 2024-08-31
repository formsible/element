<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DragIcon from '~icons/material-symbols/drag-handle'
import TrashIcon from '~icons/material-symbols/delete'

const list: Ref<{ label: string; id: string; editing: boolean }[]> = ref([])
const listEl: Ref<HTMLElement | null> = ref(null)

useSortable(listEl, list, {
  handle: '.handle',
  animation: 150,
})

const removeItem = (index: number) => {
  list.value.splice(index, 1)
}

const addItem = () => {
  list.value.push({
    editing: true,
    id: crypto.randomUUID(),
    label: '',
  })
}
</script>

<template>
  <div class="text-start">
    <div ref="listEl" class="flex flex-col gap-3 justify-center">
      <div
        v-for="(item, index) in list"
        :key="item.id"
        class="flex flex-row gap-2 items-center"
      >
        <InputText
          v-model="list[index].label"
          placeholder="Label"
          @blur="
            () => {
              if (item.label.length > 0) item.editing = false
            }
          "
          class="w-full"
        />
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
