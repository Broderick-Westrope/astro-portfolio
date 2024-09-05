<script lang="ts" setup>
defineProps<{
  list: {
    text: string
    description?: string
    icon?: string
    href: string
  }[]
}>()
</script>

<template>
  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <template v-if="!list || list.length === 0">
      <div class="py-10 opacity-50 text-lg">
        nothing here yet.
      </div>
    </template>
    <li v-for="project in list" :key="project.text" class="container-link w-full flex items-center rounded-lg">
      <a class="flex items-center" target="_blank" :href="project.href" :aria-label="project.text">
        <div class="ml-2 mr-4 pt-2">
          <i class="iconify text-4xl inline-block" :class="project.icon || 'akar-icons--question'" />
        </div>
        <div class="font-normal leading-tight">
          <div class="text-lg hover:text-main">{{ project.text }}</div>
          <div class="opacity-50 text-sm">{{ project.description }}</div>
        </div>
      </a>
    </li>
  </ul>
</template>