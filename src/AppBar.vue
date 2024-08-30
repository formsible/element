<template>
  <nav class="bg-primary p-4 text-white">
    <div class="flex justify-between items-center">
      <div>My App</div>
      <button class="bg-secondary p-2 rounded" @click="$emit('toggle-theme')">
        Toggle Theme
      </button>
    </div>
  </nav>
</template>
