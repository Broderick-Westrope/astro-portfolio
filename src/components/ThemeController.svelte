<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  // Create a writable store for dark mode
  let isDark = writable(true);

  // Toggle theme function
  function toggleDark() {
    console.log("toggleDark");
    isDark.update((value) => {
      const newValue = !value;
      if (newValue) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
      return newValue;
    });
    console.log("isDark", $isDark);
  }

  onMount(() => {
    // Check for the saved theme in localStorage
    const storedTheme = localStorage.getItem("theme");

    console.log("storedTheme", storedTheme);
    console.log(
      "prefers dark",
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
    console.log(
      "prefers light",
      window.matchMedia("(prefers-color-scheme: light)").matches,
    );

    isDark.set(
      storedTheme === "dark" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches,
    );

    console.log("isDark", $isDark);

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
    value="dark"
    bind:checked={$isDark}
    on:click={toggleDark}
  />
  <i class="iconify akar-icons--sun size-6 swap-off" />
  <i class="iconify akar-icons--moon size-6 swap-on" />
</label>
