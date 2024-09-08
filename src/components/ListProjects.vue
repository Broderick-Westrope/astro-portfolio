<script lang="ts" setup>
import type { ProjectData } from '@/types'

defineProps<{
  data: ProjectData[]
}>()
</script>

<template>
  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <template v-if="!data || data.length === 0">
      <div class="py-5 opacity-50 text-lg">
        nothing here yet...
      </div>
    </template>
    <li v-for="project in data" :key="project.title"
      class="p-2 hover:text-primary cursor-pointer hover:bg-neutral hover:bg-opacity-10 transition-colors duration-300 w-full flex items-center rounded-lg">
      <a class="flex items-center" target="_blank" :href="project.href" :aria-label="project.title">
        <div v-if="project.icon" class="ml-2 mr-4 pt-2">
          <i class="iconify text-4xl inline-block" :class="project.icon" />
        </div>
        <div class="font-normal leading-tight">
          <div class="text-xl">{{ project.title }}</div>
          <div class="text-sm opacity-80">{{ project.description }}</div>
        </div>
      </a>
    </li>
  </ul>
</template>