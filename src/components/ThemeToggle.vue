<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <label class="swap swap-rotate hover:text-primary">
    <input id="theme-controller" type="checkbox" class="theme-controller" value="light" @click="toggleDark()" />
    <i class="iconify akar-icons--sun size-6 swap-on" />
    <i class="iconify akar-icons--moon size-6 swap-off" />
  </label>
</template>