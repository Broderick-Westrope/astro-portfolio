<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  // Create a writable store for dark mode
  let isDark = writable(true);

  // Toggle theme function
  function toggleDark() {
    isDark.update((value) => {
      const newValue = !value;
      if (newValue) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
      return newValue;
    });
  }

  onMount(() => {
    // Check for the saved theme in localStorage
    const storedTheme = localStorage.getItem("theme");

    if (
      storedTheme === "light" ||
      (!storedTheme &&
        window.matchMedia("(prefers-color-scheme: light)").matches)
    ) {
      isDark.set(false);
    } else {
      isDark.set(true);
    }

    // Update local storage whenever the theme changes
    isDark.subscribe((value) => {
      localStorage.setItem("theme", value ? "dark" : "light");
    });
  });
</script>

<label class="swap swap-rotate hover:text-primary">
  <input
    type="checkbox"
    class="theme-controller"
    value="light"
    bind:checked={$isDark}
    on:click={toggleDark}
  />
  <i class="iconify akar-icons--sun size-6 swap-on" />
  <i class="iconify akar-icons--moon size-6 swap-off" />
</label>
