<script setup lang="ts">
import type { InputChoiceProperties } from '~/types'
import Select from 'primevue/select'

interface Props {
    input: InputChoiceProperties
}
defineProps<Props>()

const model = defineModel<string>({ default: '' })
</script>

<template>
    <div class="card flex justify-center">
        <Select
            v-model="model"
            :options="input.choices"
            option-label="label"
            placeholder="Select a Country"
            class="w-full md:w-56"
        >
            <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center">
                    <img
                        :alt="slotProps.value.label"
                        :src="slotProps.value.src"
                        :class="`mr-2 flag flag-${slotProps.value.value.toLowerCase()}`"
                        style="width: 18px"
                    />
                    <div>{{ slotProps.value.label }}</div>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
                <div class="flex items-center">
                    <img
                        :alt="slotProps.option.label"
                        :src="slotProps.option.src"
                        :class="`mr-2 flag flag-${slotProps.option.value.toLowerCase()}`"
                        style="width: 18px"
                    />
                    <div>{{ slotProps.option.label }}</div>
                </div>
            </template>
        </Select>
    </div>
</template>
