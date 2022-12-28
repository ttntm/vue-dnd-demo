<script setup lang="ts">
  import { computed, nextTick, ref, WritableComputedRef } from 'vue'
  import draggable from 'vuedraggable'
  import type { SortableEl } from '@/types'

  import ButtonDefault from '@/components/button/ButtonDefault.vue'
  import ButtonX from '@/components/button/ButtonX.vue'
  import GripVertical from '@/components/icon/GripVertical.vue'

  const props = defineProps<{
    input: string[]
  }>()

  const emit = defineEmits<{
    (e: 'update:list', val?: string[]): void
  }>()

  const drag = ref(false)
  const listItems: WritableComputedRef<SortableEl[]> = computed({
    get(): SortableEl[] {
      return objectify(props.input)
    },
    set(newVal: SortableEl[]): void {
      emit('update:list', valuefy(newVal))
    }
  })
  // the Vue 3 way of handling refs based on v-for
  // https://v3.vuejs.org/guide/composition-api-template-refs.html#usage-inside-v-for
  const inputs = ref<{ [el: string]: any }[]>([])

  const dragOptions = {
    animation: 350,
    ghostClass: 'ghost',
    handle: '.handle'
  }

  const objectify = (arr: string[]): SortableEl[] => {
    return arr.map((el, index) => {
      return { id: index, name: el }
    })
  }

  const valuefy = (arr: SortableEl[]): string[] => arr.map(el => el.name)

  const events = {
    async onAddItem(index?: number) {
      let currentEl = null
      let inputEls = inputs.value
      let listEls = [...listItems.value]
      
      if (index !== undefined && index > -1) {
        listEls.splice(index + 1, 0, { id: index+1, name: '' })
        listItems.value = listEls
        await nextTick() // await next tick to avoid 'x is undefined...' errors
        currentEl = inputEls[index+1]
      } else {
        listItems.value = listEls.concat({ id: listEls.length, name: '' })
        await nextTick() // await next tick to avoid 'x is undefined...' errors
        currentEl = inputEls[inputEls.length-1]
      }
      
      if (currentEl) currentEl.focus()
    },

    onChangeItem() {
      emit('update:list', valuefy(listItems.value))
    },

    onRemoveItem(index: number) {    
      listItems.value = listItems.value.filter(el => el.id !== index)
      inputs.value.splice(index, 1)
    }
  }
</script>

<template>
  <div id="dnd-list" class="border-t border-gray-600 pt-4">
    <draggable
      v-model="listItems"
      :component-data="{
        tag: 'ul',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null
      }"
      v-bind="dragOptions"
      item-key="id"
      class="ing-list list-none p-0 mb-3"
      @start="drag=true"
      @end="drag=false"
    >
      <template #item="{ element, index }">
        <li :class="{ 'grabbing' : drag }" class="flex flex-row items-center border border-transparent px-1 py-2 mb-1">
          <span :class="{ 'text-gray-900' : drag }" class="handle mr-2" title="Move element">
            <GripVertical />
          </span>
          <input type="text"
            v-model.trim="element.name"
            :placeholder="`Ingredient ${index + 1}`"
            :ref="el => { if (el) inputs[index] = el }"
            class="inline-block form-control text-sm"
            @input="events.onChangeItem"
            @keydown.enter="events.onAddItem(index)"
          >
          <ButtonX size="20" class="rounded-full text-gray-700 hover:text-gray-900 focus:text-gray-900 ml-2" @click="events.onRemoveItem(index)" />
        </li>
      </template>
    </draggable>
    <ButtonDefault class="block text-sm" @click="events.onAddItem()">Add List Item</ButtonDefault>
  </div>
</template>

<style lang="postcss" scoped>
  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    @apply border border-gray-500 rounded-lg shadow-lg pointer-events-none;
  }

  .grabbing * {
    cursor: grabbing !important;
  }

  .handle {
    @apply cursor-move block text-gray-700;
  }

  .handle:hover,
  .ghost .handle {
    @apply text-gray-900;
  }
</style>
