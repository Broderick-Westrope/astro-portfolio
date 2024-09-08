<script lang="ts">
  import { onMount } from "svelte";

  let scrollY = 0;

  function toTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  onMount(() => {
    const onScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });
</script>

<button
  aria-label="Scroll to top"
  class="fixed right-5, sm:right-32 bottom-32 size-12 text-lg hover:opacity-100 rounded-full flex items-center justify-center bg-accent text-accent-content transition duration-300 z-10 print:hidden"
  class:opacity-75={scrollY > 300}
  class:opacity-0={scrollY <= 300}
  class:pointer-events-none={scrollY <= 300}
  on:click={toTop}
>
  <span class="iconify akar-icons--arrow-up" />
</button>
