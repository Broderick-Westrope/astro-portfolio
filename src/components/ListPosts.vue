<script lang="ts" setup>
interface Post {
  id: string
  slug: string
  body: string
  data: Record<string, any>
  collection: string
  render: any
}

withDefaults(defineProps<{
  list: Post[]
}>(), {
  list: () => [],
})

function getDate(date: string) {
  return new Date(date).toISOString()
}

function getHref(post: Post) {
  if (post.data.redirect)
    return post.data.redirect
  return `/posts/${post.slug}`
}

function getTarget(post: Post) {
  if (post.data.redirect)
    return '_blank'
  return '_self'
}

function isSameYear(a: Date | string | number, b: Date | string | number) {
  return a && b && getYear(a) === getYear(b)
}

function getYear(date: Date | string | number) {
  return new Date(date).getFullYear()
}
</script>

<template>
  <ul class="sm:min-h-36 min-h-28 mb-16">
    <template v-if="!list || list.length === 0">
      <div my-12 opacity-50>
        nothing here yet.
      </div>
    </template>
    <li v-for="(post, index) in list " :key="post.data.title" class="mb-8">
      <div v-if="!isSameYear(post.data.date, list[index - 1]?.data.date)" 
      class="select-none relative h-16 pointer-events-none">
        <span class="text-8xl text-transparent font-bold stroke-2 stroke-gray-400 opacity-15 absolute top-1">
          {{ getYear(post.data.date) }}
        </span>
      </div>
      <a class="text-lg leading-tight nav-link flex flex-col gap-2"
      :aria-label="post.data.title" :target="getTarget(post)" :href="getHref(post)">
        <div class="flex flex-col md:flex-row gap-2 md:items-center">
          <div class="flex gap-2 items-center text-wrap">
            <span class="leading-normal">
              <span v-if="post.data.draft" class="iconify text-base align-middle akar-icons--draft" />
              {{ post.data.title }}
            </span>
          </div>
          <div class="opacity-50 text-sm whitespace-nowrap flex gap-2 items-center">
            <span v-if="post.data.redirect" class="iconify text-base akar-icons--link-out" />
            <span v-if="post.data.recording || post.data.video" class="iconify text-base akar-icons--video" />
            <time v-if="post.data.date" :datetime="getDate(post.data.date)">{{ post.data.date.split(',')[0] }}</time>
            <span v-if="post.data.duration">· {{ post.data.duration }}</span>
            <span v-if="post.data.tag">· {{ post.data.tag }}</span>
          </div>
        </div>
        <div class="opacity-50 text-sm">{{ post.data.description }}</div>
      </a>
    </li>
  </ul>
</template>