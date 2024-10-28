<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import DragIcon from '~icons/material-symbols/drag-pan-rounded'
import TrashIcon from '~icons/material-symbols/delete'
import { InputProperties } from '~/types'

interface Props {
    input: InputProperties
    error?: string
    readonly?: boolean
}

const props = defineProps<Props>()
const model = defineModel<string[]>({ default: [] })

const list: Ref<{ label: string; id: string }[]> = ref([])
const listEl: Ref<HTMLElement | null> = ref(null)

watch(
    () => props.input.props,
    () => {
        list.value = (props.input?.props?.items || []).map((i: any) => {
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
                        { 'handle cursor-move': !readonly },
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
