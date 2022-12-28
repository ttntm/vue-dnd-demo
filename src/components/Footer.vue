<script setup lang="ts"> 
  const date: Date = new Date()
  const year: number = date.getFullYear()
</script>

<template>
  <div id="app-footer" class="text-cool-gray-500 mt-12">
    <div class="container text-center pt-12 pb-8 mx-auto">
      <p class="text-sm mb-2">Made with Vue, TS and ♥ by <a class="hover:text-black hover:underline" href="https://ttntm.me" target="_blank" rel="noopener">ttntm</a></p>
      <p class="text-xs m-0">&copy; {{ year }}, <a class="hover:text-black hover:underline" href="https://github.com/ttntm/vue-dnd-demo/" target="_blank" rel="noopener">Code@GitHub (MIT)</a></p>
    </div>
  </div>
</template>