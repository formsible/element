<script setup lang="ts">
import { computed, defineModel } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import type { InputProperties } from '../../types'

interface DataTableProperties extends InputProperties {
    fields: string[]
}
interface Props {
    input: DataTableProperties
    error?: string
}
const props = defineProps<Props>()

const model = defineModel<object[]>({ default: [] })

const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)

// Function to delete row
const deleteRow = (index: number) =>
    (model.value = model.value.filter((_, i) => index !== i))

// Function to add a new row with default values
const addNewRow = () => {
    const rowToAdd = props.input.fields.reduce(
        (acc, column) => {
            acc[column] = column + model.value.length // Default value for each column
            return acc
        },
        {} as Record<string, string>,
    )
    model.value = [...model.value, rowToAdd]
}
</script>

<template>
    <div>
        <label :for="input.key">
            {{ input.label }}
            <span v-if="isRequired" class="text-red-600 dark:text-red-400"
                >*</span
            >
        </label>
        <p>{{ input.description }}</p>

        <!-- DataTable section -->
        <DataTable :value="model">
            <Column
                v-for="column in input.fields"
                :key="column"
                :field="column"
                :header="column"
            >
                <template #body="{ data, field }">
                    <InputText
                        v-model="data[field]"
                        fluid
                        :placeholder="field"
                        size="small"
                    />
                </template>
            </Column>
            <Column :exportable="false">
                <template #body="{ index }">
                    <Button
                        icon="pi pi-trash"
                        text
                        size="small"
                        severity="danger"
                        @click="deleteRow(index)"
                    />
                </template>
            </Column>
        </DataTable>
        <!-- Add New Button -->
        <Button @click="addNewRow">Add New</Button>

        <!-- If error -->
        <small v-if="error" :id="`${input.key}-help`">
            {{ error }}
        </small>
    </div>
</template>
