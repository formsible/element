<script setup lang="ts">
import { defineProps, ref, computed, type PropType } from 'vue'
import type { InputProperties } from '~/types'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'

const props = defineProps({
    input: {
        type: Object as PropType<InputProperties>,
        required: true,
    },
    theme: {
        type: Object,
        default: () => ({
            container: '',
            label: 'w-full',
            calendar: 'w-full',
            description: 'text-sm text-slate-700 dark:text-slate-300',
            error: 'text-red-600',
            button: 'p-button-outlined p-mt-2',
        }),
    },
    error: {
        type: String,
        default: '',
    },
})

const selectedDate = ref<Date | null>(null)
const selectedTime = ref<string>('')

const handleDateChange = (value: Date | null) => {
    selectedDate.value = value
}

const handleTimeSlotSelect = (slot: string) => {
    selectedTime.value = slot
}

const formattedDateTime = computed(() => {
    if (!selectedDate.value) return ''
    return `${selectedDate.value.toISOString().slice(0, 10)} ${
        selectedTime.value
    }`
})
const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
</script>

<template>
    <div :class="theme.container">
        <label :class="theme.label" :for="input.key">
            {{ input.label }}
            <span
                v-if="isRequired"
                class="text-red-600 dark:text-red-400 -ml-0.5"
                >*</span
            >
        </label>
        <p :class="theme.description">{{ input.description }}</p>

        <!-- Date Picker -->
        <Calendar
            v-model="selectedDate"
            :class="theme.calendar"
            :show-time="true"
            hour-format="24"
            v-bind="{ ...$attrs, ...props.input.props }"
            @change="handleDateChange"
        />

        <!-- Time Slot Buttons -->
        <div class="mt-2">
            <Button
                v-for="slot in ['09:00', '12:00', '15:00', '18:00']"
                :key="slot"
                :class="theme.button"
                @click="handleTimeSlotSelect(slot)"
            >
                {{ slot }}
            </Button>
        </div>

        <!-- Display selected date-time -->
        <div v-if="formattedDateTime" class="mt-2">
            <p>Selected Date and Time: {{ formattedDateTime }}</p>
        </div>

        <!-- if error -->
        <small
            v-if="error"
            :id="`${input.key}-help`"
            class="text-sm mt-0.5"
            :class="theme.error"
        >
            {{ error }}
        </small>
    </div>
</template>
