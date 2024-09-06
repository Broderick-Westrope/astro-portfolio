<script lang="ts" setup>
import type { MentionData } from '@/types';

defineProps<{
  data: MentionData,
}>()
</script>

<template>
  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <template v-if="!data || data.length === 0">
      <div class="py-5 opacity-50 text-lg">
        nothing here yet...
      </div>
    </template>
    <li v-for="repo in data" :key="repo.href"
      class="p-2 hover:text-primary cursor-pointer hover:bg-neutral hover:bg-opacity-10 transition-colors duration-300 w-full flex items-center rounded-lg">
      <a class="flex items-center" target="_blank" :href="repo.href" :aria-label="repo.text">
        <div class="font-normal leading-tight">
          <div class="text-xl">{{ repo.text }}</div>
          <div class="text-sm opacity-80">{{ repo.description }}</div>
        </div>
      </a>
    </li>
  </ul>
</template>