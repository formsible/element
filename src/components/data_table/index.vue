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
      container: 'flex flex-col gap-2',
      label: 'w-full text-black dark:text-white',
      table: 'p-datatable w-full',
      description: 'text-sm text-slate-700 dark:text-slate-300',
      error: 'text-red-600 dark:text-red-400',
      input: 'w-full',
      button: 'p-button p-component',
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

// Function to handle cell edit completion
const onCellEditComplete = (event: any) => {
  let { data, newValue, field } = event

  // Simple validation for non-empty fields
  if (newValue.trim().length > 0) {
    data[field] = newValue
  } else {
    event.preventDefault()
  }
}

// Function to add a new row with default values
const addNewRow = () => {
  console.log('add new row')
  const defaultRow = props.input.choices?.reduce(
    (acc, column) => {
      acc[column.value] = 'a' // Default value for each column
      return acc
    },
    {} as Record<string, string>,
  )

  // model.value.push(defaultRow)
  model.value.push({ name: 'a', age: 'b', email: 'a@gm.com' })
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
    <DataTable
      v-model:selection="model"
      :value="model"
      :class="theme.table"
      editMode="cell"
      @cell-edit-complete="onCellEditComplete"
      :pt="{
        table: { style: 'min-width: 50rem' },
        column: {
          bodycell: ({ state }: any) => ({
            class: [{ 'pt-0 pb-0': state['d_editing'] }],
          }),
        },
      }"
    >
      <Column
        v-for="column in input.choices"
        :key="column.value"
        :field="column.value"
        :header="column.label"
        style="width: 25%"
      >
        <template #body="{ data, field }">
          {{ data[field] }}
        </template>
        <template #editor="{ data, field }">
          <InputText
            v-model="data[field]"
            :class="theme.input"
            autofocus
            fluid
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
