<script setup lang="ts">
defineEmits<{
  toggleTheme: [];
}>();
</script>

<template>
  <nav class="p-4">
    <div class="flex justify-between items-center">
      <div>My App</div>
      <button class="p-2 rounded" @click="$emit('toggleTheme')">
        Toggle Theme
      </button>
    </div>
  </nav>
</template>
