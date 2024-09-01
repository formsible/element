<script setup lang="ts">
import { defineProps, computed, defineModel, type PropType } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import type { InputProperties } from '../../types'

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
      table: 'w-full',
      description: 'text-sm text-slate-700 dark:text-slate-300',
      error: 'text-red-600 dark:text-red-400',
      input: 'w-full',
      button: '',
    }),
  },
  error: {
    type: String,
    default: '',
  },
})

const model = defineModel<any[]>({ default: [] })

const isRequired = computed(() =>
  props.input.validations?.map((v) => v.rule).includes('required'),
)

// Function to delete row
const deleteRow = (index: number) => {
  model.value.splice(index, 1)
}

// Function to add a new row with default values
const addNewRow = () => {
  const defaultRow = props.input.choices?.reduce(
    (acc, column) => {
      acc[column.value] = '' // Default value for each column
      return acc
    },
    {} as Record<string, string>,
  )

  model.value = model.value.concat([defaultRow])
}
</script>

<template>
  <div :class="theme.container">
    <pre>{{ model }}</pre>
    <label :class="theme.label" :for="input.key">
      {{ input.label }}
      <span v-if="isRequired" class="text-red-600 dark:text-red-400">*</span>
    </label>
    <p :class="theme.description">{{ input.description }}</p>

    <!-- DataTable section -->
    <DataTable :value="model" size="small" :class="theme.table">
      <Column
        v-for="column in input.choices"
        :key="column.value"
        :field="column.value"
        :header="column.label"
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
    <Button @click="addNewRow" :class="theme.button"> Add New </Button>

    <!-- If error -->
    <small v-if="error" :id="`${input.key}-help`" :class="theme.error">
      {{ error }}
    </small>
  </div>
</template>
