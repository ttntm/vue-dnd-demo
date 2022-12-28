<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import DndList from '@/components/DndList.vue'
  import Footer from '@/components/Footer.vue'

  const listData = ref<string[]>([])

  onMounted(() => {
    const app = document.getElementById('app')
    if (app) {
      app.style.opacity = '1'
      app.style.transition = 'opacity 1.5s ease'
    }
  })

  const onUpdateListData = (value?: string[]) => {
    if (!value) return
    listData.value = value
  }
</script>

<template>
  <div id="app-inner" class="flex h-full flex-col">
    <div class="container flex-grow flex-shrink-0 px-4 mt-12 mx-auto">
      <div class="w-full sm:w-3/5 lg:w-1/2 mx-auto">
        <h1 class="h3 mb-2">DnD Data List</h1>
        <p>
          A minimal demo of an editable list that also supports drag'n'drop.
          <br>
          Based on the implementation of recipe ingredients in recept0r.com (<a class="text-gray-800 hover:text-black hover:underline" href="https://github.com/ttntm/recept0r-ts/" target="_blank" rel="noopener">Code@GitHub</a>)
        </p>
        <DndList :input="listData" @update:list="onUpdateListData" />
        <div class="mt-12">
          <h2 class="h4 mb-2">Raw Data</h2>
          <p class="text-sm">Data the parent component receives from (and passes to) the <code class="text-xs text-gray-800 bg-gray-500 rounded p-1">DndList.vue</code> component.</p>
          <pre class="w-full block text-sm text-gray-800 bg-gray-500 rounded p-4">{{ listData }}</pre>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>