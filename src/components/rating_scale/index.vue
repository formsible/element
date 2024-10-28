<script setup lang="ts">
import { computed } from 'vue'
import type { InputRatingProperties } from '~/types'
import Rating from 'primevue/rating'

interface Props {
    input: InputRatingProperties
    error?: string
}
const props = defineProps<Props>()

const model = defineModel<number>()

const isRequired = computed(() =>
    props.input.validations?.map((v) => v.rule).includes('required'),
)
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
        <Rating
            :id="input.key"
            v-model="model"
            :stars="input.stars || 5"
            :cancel="false"
            :input-id="input.key"
            v-bind="input.props"
        />
        <small v-if="error" :id="`${input.key}-help`" class="text-red-500">
            {{ error }}
        </small>
    </div>
</template>
