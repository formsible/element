<template>
    <div
        class="bg-white dark:bg-gray-900 text-black flex flex-col h-screen overflow-hidden dark:text-white"
    >
        <AppBar v-model:theme="theme" class="flex-none" />
        <div class="flex gap-4 mx-auto overflow-hidden flex-auto">
            <div class="w-1/4 overflow-auto p-4">
                <h2 class="text-xl font-bold mb-4">Components</h2>

                <template v-for="group in componentGroups" :key="group.label">
                    <p
                        class="font-semibold mb-2 text-slate-600 dark:text-slate-300"
                    >
                        {{ group.label }}
                    </p>
                    <button
                        v-for="comp in group.items"
                        :key="comp.meta.name"
                        :class="[
                            'w-full text-start transition p-2 mb-2 rounded  ',
                            selectedComponent?.name === comp.meta.name
                                ? 'text-[var(--p-primary-500)] dark:bg-[var(--p-primary-950)] bg-[var(--p-primary-50)]'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800',
                        ]"
                        @click="selectComponent(comp)"
                    >
                        <div>
                            <div class="font-semibold">
                                {{ comp.meta.name }}
                            </div>
                            <div
                                class="text-sm text-gray-600 dark:text-gray-400"
                            >
                                {{ comp.meta.description }}
                            </div>
                        </div>
                    </button>
                </template>
            </div>

            <div class="w-1/2 overflow-auto p-4">
                <h2 class="text-xl font-bold mb-4">Preview</h2>
                <pre>{{ formComponents[currentComponentIndex] }}</pre>
                <Transition
                    mode="out-in"
                    enterActiveClass="transition duration-100 delay-100"
                    leaveActiveClass="transition duration-100"
                    enterFromClass="opacity-0 scale-95"
                    leaveToClass="opacity-0 scale-95"
                >
                    <component
                        v-if="currentComponentIndex > -1"
                        :is="formComponents[currentComponentIndex].component"
                        v-model="
                            state[formComponents[currentComponentIndex].name]
                        "
                        :input="
                            formComponents[currentComponentIndex].inputProps
                        "
                        :display="
                            formComponents[currentComponentIndex].inputProps
                        "
                        :error="
                            formComponents[currentComponentIndex].inputProps
                                ?.error
                        "
                        :readonly="true"
                    />
                </Transition>
            </div>

            <div class="w-1/4 overflow-auto p-4">
                <h2 class="text-xl font-bold mb-4">Options</h2>
                <div v-if="selectedComponent">
                    <label for="label">Label</label>
                    <InputText
                        id="label"
                        v-model="selectedComponent.inputProps.label"
                        placeholder="Label"
                        class="w-full mb-2 p-2 border rounded"
                    />
                    <label for="description">Description</label>
                    <Textarea
                        id="description"
                        v-model="selectedComponent.inputProps.description"
                        placeholder="Description"
                        class="w-full mb-2 p-2 border rounded"
                    />
                    <template
                        v-if="
                            selectedComponent.name === 'LongText' ||
                            selectedComponent.name === 'ShortText'
                        "
                    >
                        <label for="placeholder">Placeholder</label>
                        <InputText
                            id="placeholder"
                            v-model="selectedComponent.inputProps.placeholder"
                            placeholder="Placeholder"
                            class="w-full mb-2 p-2 border rounded"
                        />
                    </template>
                    <label for="error">Error Message</label>
                    <InputText
                        id="error"
                        v-model="selectedComponent.inputProps.error"
                        placeholder="Error Message"
                        class="w-full mb-2 p-2 border rounded"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    ref,
    reactive,
    shallowRef,
    onMounted,
    type Ref,
    type Component,
    computed,
    watch,
} from 'vue'
import AppBar from './AppBar.vue'
import type { ElementManifest } from './types'
import { useTheme } from './utils/apply-theme'
import type { ThemeData } from './types/theme'
const state = reactive<Record<string, unknown>>({})

interface IComponent {
    name: string
    component: Component | string
    inputProps: any
}

const availableComponents: Ref<ElementManifest[]> = ref([])
const formComponents: Ref<IComponent[]> = ref([])
const selectedComponent = shallowRef<IComponent | undefined>()
const currentComponentIndex = computed(() =>
    formComponents.value.findIndex(
        (el) => el.name == selectedComponent.value?.name,
    ),
)
const inputComponents = computed(() =>
    availableComponents.value.filter(
        (component) => component.init.type == 'input',
    ),
)
const displayComponents = computed(() =>
    availableComponents.value.filter(
        (component) => component.init.type == 'display',
    ),
)
const componentGroups = computed(() => [
    {
        label: 'Input',
        items: inputComponents.value,
    },
    {
        label: 'Display',
        items: displayComponents.value,
    },
])

const theme = ref('light')

watch(theme, () => {
    document.documentElement.classList.toggle('dark', theme.value === 'dark')
})

const selectComponent = (comp: ElementManifest) => {
    selectedComponent.value = formComponents.value.find(
        (c: IComponent) => c.name === comp.meta.name,
    )
}

onMounted(async () => {
    const manifest = await import('../manifest.json')
    availableComponents.value = (
        manifest.components as unknown as ElementManifest[]
    ).filter((comp) => {
        return comp.meta?.enabled
    })

    formComponents.value = availableComponents.value.map((comp) => {
        return {
            name: comp.meta?.name || 'Unnamed Component',
            component:
                comp.init?.properties.input?.component ||
                comp.init?.properties.display?.component,
            inputProps: {
                ...comp.init?.properties.input,
                ...comp.init?.properties.display,
            },
        }
    })

    for (const comp of formComponents.value) {
        const module = await import(`./components/${comp.component}/index.vue`)
        comp.component = shallowRef(module.default)
    }

    if (formComponents.value.length > 0) {
        selectedComponent.value = formComponents.value[0]
    }

    const themeData: Ref<ThemeData> = ref({
        tailwind: {
            container: {
                padding: 'p-4',
                baseBackground: 'bg-white',
                baseTextColor: 'text-black',
                baseFontSize: 'text-base',
            },
            button: {
                padding: 'py-2 px-4',
                baseBackground: 'bg-blue-500',
                baseTextColor: 'text-white',
                borderRadius: 'rounded-lg',
            },
            input: {
                baseBorder: 'border',
                basePadding: 'p-2',
                borderColor: 'border-gray-300',
                borderRadius: 'rounded-md',
            },
        },
        variables: {
            container: {
                backgroundColor: '#ffffff',
                textColor: '#000000',
                fontSize: '16px',
            },
            button: {
                backgroundColor: '#3b82f6',
                textColor: '#ffffff',
                borderRadius: '0.5rem',
            },
            input: {
                borderColor: '#d1d5db',
                borderRadius: '0.375rem',
                backgroundColor: '#ffffff',
                textColor: '#000000',
            },
            error: {
                textColor: '#ef4444',
            },
        },
        values: {
            container: {
                backgroundColor: '#ffffff',
                textColor: '#000000',
                fontSize: '16px',
            },
            button: {
                backgroundColor: '#3b82f6',
                textColor: '#ffffff',
                borderRadius: '0.5rem',
            },
            input: {
                borderColor: '#d1d5db',
                borderRadius: '0.375rem',
            },
        },
    })

    useTheme(themeData)
})
</script>
