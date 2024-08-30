<template>
  <div :class="currentTheme">
    <AppBar @toggle-theme="toggleTheme" />
    <div class="flex p-4 gap-4 mx-auto max-w-7xl">
      <div class="w-1/4 pr-4">
        <h2 class="text-xl font-bold mb-4">Available Components</h2>
        <div
          v-for="comp in availableComponents"
          :key="comp.meta.name"
          :class="[
            'flex items-center p-2 mb-2 border rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700',
            {
              'bg-blue-100 dark:bg-blue-800':
                selectedComponent?.name === comp.meta.name,
            },
          ]"
          @click="selectComponent(comp)"
        >
          <div>
            <div class="font-semibold">{{ comp.meta.name }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ comp.meta.description }}
            </div>
          </div>
        </div>
      </div>

      <div class="w-1/2 px-4">
        <h2 class="text-xl font-bold mb-4">Form Preview</h2>
        <div v-for="comp in formComponents" :key="comp.name" class="my-4">
          <component
            :is="comp.component"
            v-model="state[comp.name]"
            :input="comp.inputProps"
            :display="comp.inputProps"
            :error="comp.inputProps?.error"
          />
        </div>
      </div>

      <div class="w-1/4 pl-4">
        <h2 class="text-xl font-bold mb-4">Component Options</h2>
        <div
          v-if="selectedComponent"
          class="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
        >
          <input
            v-model="selectedComponent.inputProps.label"
            placeholder="Label"
            class="w-full mb-2 p-2 border rounded"
          />
          <input
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
            <input
              v-model="selectedComponent.inputProps.placeholder"
              placeholder="Placeholder"
              class="w-full mb-2 p-2 border rounded"
            />
          </template>
          <input
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
import { ref, reactive, computed, shallowRef, onMounted, type Ref } from 'vue'
import type { ElementManifest } from './types'
import AppBar from './AppBar.vue'
import { useTheme } from './utils/apply-theme'
import type { ThemeData } from './types/theme'
const state = reactive<Record<string, unknown>>({})

interface IComponent {
  name: string
  component: any
  inputProps: any
}

const availableComponents: Ref<ElementManifest[]> = ref([])
const formComponents: Ref<IComponent[]> = ref([])
const selectedComponent = shallowRef<IComponent | undefined>()

const theme = ref('light')

const currentTheme = computed(() => (theme.value === 'dark' ? 'dark' : ''))

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
}

const selectComponent = (comp: ElementManifest) => {
  selectedComponent.value = formComponents.value.find(
    (c: IComponent) => c.name === comp.meta.name
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
