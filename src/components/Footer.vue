<script lang="ts" setup>
import siteConfig from '@/site-config'
import { getLinkTarget } from '@/utils/link'
</script>

<template>
  <footer class="w-full mt-20 pt-6 pb-8 max-w-3xl text-sm flex flex-col gap-4 border-t !border-opacity-50 text-dark dark:text-white">
    <div v-if="siteConfig.footer.navLinks && siteConfig.footer.navLinks.length > 0" class="flex flex-wrap gap-4">
      <template v-for="(link, index) in siteConfig.footer.navLinks" :key="link.text">
        <a
          :aria-label="`${link.text}`" :target="getLinkTarget(link.href)" class="opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer flex items-center"
          :href="link.href"
        >
          {{ link.text }}
        </a>
        <span v-if="index < siteConfig.footer.navLinks.length - 1" class="opacity-70"> / </span>
      </template>
    </div>
    <div class="flex">
      <a class="opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA 4.0</a>
      <span class="opacity-70">&nbsp;&nbsp;&copy;&nbsp;&nbsp;{{ new Date().getFullYear() }}&nbsp;&nbsp;{{ siteConfig.author
      }}.</span>
    </div>
  </footer>
</template>