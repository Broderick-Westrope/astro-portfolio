<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
import { computed, onMounted, ref, unref } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
import siteConfig from '@/site-config'
import { getLinkTarget } from '@/utils/link'

const navLinks = siteConfig.header.navLinks || []

const blurClass = 'backdrop-blur-sm'
const headerHideClasses = ['-translate-y-full', 'transition-transform', 'duration-300']

const socialLinks = computed(() => {
  return siteConfig.socialLinks.filter((link: Record<string, any>) => {
    if (link.header && typeof link.header === 'boolean') {
      return link
    }
    else if (link.header && typeof link.header === 'string') {
      link.icon = link.header.includes('i-') ? link.header : link.icon
      return link
    }
    else {
      return false
    }
  })
})

const { y: scroll } = useWindowScroll()

const oldScroll = ref(unref(scroll))

onMounted(() => {
  const navMask = document.getElementById('nav-drawer-mask') as HTMLElement

  navMask?.addEventListener('touchmove', (event) => {
    event.preventDefault()
  })

  const headerEl = document.getElementById('header') as HTMLElement
  if (!headerEl)
    return

  if (document.documentElement.scrollTop > 100)
    headerEl.classList.add(blurClass)

  window.addEventListener('scroll', () => {
    if (scroll.value < 150) {
      headerEl.classList.remove(blurClass)
      return
    }

    if (scroll.value - oldScroll.value > 150) {
      headerEl.classList.add(...headerHideClasses)
      oldScroll.value = scroll.value
    }

    if (oldScroll.value - scroll.value > 150) {
      headerEl.classList.remove(...headerHideClasses)
      oldScroll.value = scroll.value
    }
  })
})

function toggleNavDrawer() {
  const drawer = document.getElementById('nav-drawer') as HTMLElement
  const mask = document.getElementById('nav-drawer-mask') as HTMLElement
  if (!drawer || !mask)
    return
  if (drawer.style.transform === `translateX(0%)`) {
    drawer.style.transform = `translateX(-100%)`
    mask.style.display = `none`
  }
  else {
    drawer.style.transform = `translateX(0%)`
    mask.style.display = `block`
  }
}
</script>

<template>
  <header id="header" :class="{ 'backdrop-blur-sm': scroll > 20 }"
    class="!fixed bg-transparent z-50 w-screen h-20 px-6 flex justify-between items-center">
    <div class="flex items-center h-full gap-x-6">
      <a href="/" mr-6 aria-label="Header Logo Image">
        <img width="32" height="32" :src="siteConfig.header.logo.src" :alt="siteConfig.header.logo.alt">
      </a>
      <nav class="sm:flex hidden flex-wrap gap-x-6 position-initial flex-row">
        <a v-for="link in navLinks" :key="link.text" :aria-label="`${link.text}`" :target="getLinkTarget(link.href)"
          class="nav-link" :href="link.href">
          {{ link.text }}
        </a>
      </nav>
      <div class="sm:hidden h-full flex items-center" @click="toggleNavDrawer()">
        <span class="iconify akar-icons--three-line-horizontal size-6" />
      </div>
    </div>
    <div class="flex gap-x-6">
      <a v-for="link in socialLinks" :key="link.text" :aria-label="`${link.text}`" :class="link.icon" class="iconify nav-link"
        :target="getLinkTarget(link.href)" :href="link.href" />

      <a class="nav-link" target="_blank" href="/rss.xml" i-ri-rss-line aria-label="RSS" />
      <ThemeToggle />
    </div>
  </header>
  <nav id="nav-drawer" class="-translate-x-full sm:hidden box-border fixed h-screen z-50 left-0 top-0 min-w-32 max-w-60 p-6 text-lg flex flex-col gap-5 transition-all bg-base-200">
    <span class="iconify akar-icons--three-line-horizontal size-6" />
    <a v-for="link in navLinks" :key="link.text" :aria-label="`${link.text}`" :target="getLinkTarget(link.href)"
      class="nav-link" :href="link.href" @click="toggleNavDrawer()">
      {{ link.text }}
    </a>
  </nav>
  <div id="nav-drawer-mask" class="hidden transition-all content-none fixed top-0 left-0 w-full h-full bg-base-300 z-40 opacity-50" @click="toggleNavDrawer()" />
</template>
