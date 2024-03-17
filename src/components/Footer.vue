<script lang="ts" setup>
import siteConfig from '../site-config'
</script>

<template>
  <footer class="w-full px-6 pt-4 pb-12 max-w-3xl mx-auto opacity-60">
    <div class="mb-6 flex flex-wrap justify-center gap-x-4 gap-y-2">
      <a v-for="link in siteConfig.footerNavLinks" :key="link.text" class="nav-link flex items-center" :href="link.href">
        <i :class="[link.icon, 'text-base', 'mr-1']" />
        <span>{{ link.text }}</span>
      </a>
    </div>
    <div class="flex flex-wrap justify-center text-dark dark:text-white">
      <span class="opacity-70">2023-PRESENT ©</span>
      <a class="!nav-link opacity-100 ml-1" href="/">{{ siteConfig.author }}</a>
    </div>
  </footer>
</template>
