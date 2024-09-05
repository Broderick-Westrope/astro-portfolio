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
        nothing here yet...
      </div>
    </template>
    <li v-for="(post, index) in list " :key="post.data.title" class="mb-8">
      <div v-if="!isSameYear(post.data.date, list[index - 1]?.data.date)"
        class="select-none relative h-16 pointer-events-none">
        <span class="text-8xl opacity-20 font-bold absolute top-2">
          {{ getYear(post.data.date) }}
        </span>
      </div>
      <a class="text-xl leading-tight flex flex-col gap-2 hover:text-primary transition-colors duration-200 cursor-pointer"
        :aria-label="post.data.title" :target="getTarget(post)" :href="getHref(post)">
        <div class="flex flex-col md:flex-row gap-2 md:items-center">
          <div class="flex items-center text-wrap">
            <span class="leading-normal flex gap-x-2 items-center justify-center">
              <span v-if="post.data.draft" class="iconify akar-icons--pencil size-6 text-warning" />

              <span v-if="post.slug.includes('talks')" class="iconify akar-icons--microphone size-6 text-info" />
              <span v-else-if="post.slug.includes('posts')"
                class="iconify akar-icons--paper-airplane size-6 text-info" />
              <span v-else class="iconify akar-icons--question size-6 text-error" />

              {{ post.data.title }}
            </span>
          </div>
          <div class="whitespace-nowrap flex gap-2 items-center">
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