<script setup lang="ts">
defineEmits<{
  toggleTheme: []
}>()
</script>

<template>
  <div
    class="flex sticky top-0 w-full justify-between py-2 px-4 bg-gray-100 dark:bg-gray-900 dark:text-white z-50 items-center"
  >
    <div>My App</div>
    <Button @click="$emit('toggleTheme')" severity="secondary"
      >Toggle Theme</Button
    >
  </div>
</template>
