<script setup lang="ts">
import DarkIcon from '~icons/material-symbols/dark-mode'
import LightIcon from '~icons/material-symbols/light-mode'

const theme = defineModel<string>('theme', { required: true })
const toggleTheme = () => {
  if (theme.value == 'light') theme.value = 'dark'
  else theme.value = 'light'
}
</script>

<template>
  <div class="flex w-full items-center justify-between py-2 px-4">
    <div class="flex flex-row gap-2 items-center">
      <img src="../favicon.ico" class="size-5" />
      <p class="m-0 font-semibold text-lg dark:text-slate-200 text-slate-700">
        My App
      </p>
    </div>
    <Button @click="toggleTheme" text plain>
      <LightIcon v-if="theme == 'light'" />
      <DarkIcon v-else />
    </Button>
  </div>
</template>
