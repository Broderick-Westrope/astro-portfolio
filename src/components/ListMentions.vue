<script lang="ts" setup>
import { Octokit } from '@octokit/rest';
import { onMounted, ref } from 'vue';

const { links } = defineProps<{
  links: string[]
}>()

type MentionData = {
  text: string
  description: string | null
  href: string
}

let list = ref(new Array<MentionData>())

onMounted(async () => {
  // Octokit.js https://github.com/octokit/core.js#readme
  const octokit = new Octokit()

  for (let i = 0; i < links.length; i++) {
    const response = await octokit.request('GET /repos/' + links[i])

    let element: MentionData = {
      text: response.data.name,
      description: response.data.description,
      href: response.data.html_url
    }
    list.value.push(element)
  }
})

</script>

<template>
  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <template v-if="!links || links.length === 0">
      <div class="py-5 opacity-50 text-lg">
        nothing here yet...
      </div>
    </template>
    <li v-for="repo in list" :key="repo.href"
      class="p-2 opacity-70 hover:opacity-100 hover:text-primary cursor-pointer hover:bg-neutral hover:bg-opacity-10 transition-opacity duration-300 w-full flex items-center rounded-lg">
      <a class="flex items-center" target="_blank" :href="repo.href" :aria-label="repo.text">
        <div class="font-normal leading-tight">
          <div class="text-xl">{{ repo.text }}</div>
          <div class="opacity-50 text-sm text-neutral">{{ repo.description }}</div>
        </div>
      </a>
    </li>
  </ul>
</template>