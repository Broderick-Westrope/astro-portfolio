<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'

const { y: scroll } = useWindowScroll()

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <button
    aria-label="Scroll to top"
    class="fixed right-5, sm:right-32 bottom-32 w-12 h-12 text-lg hover:opacity-100 rounded-full flex items-center justify-center bg-accent text-accent-content transition duration-300 z-10 print:hidden"
    :class="scroll > 300 ? 'opacity-75' : 'opacity-0 pointer-events-none'"
    @click="toTop()"
  >
    <span class="iconify akar-icons--arrow-up" />
  </button>
</template>