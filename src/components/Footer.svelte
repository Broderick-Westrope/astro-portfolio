<script lang="ts">
  import siteConfig from "@/site-config.ts";
  import { getLinkTarget } from "@/utils/link";
</script>

<footer
  class="w-full mt-20 pt-6 pb-8 max-w-4xl text-sm flex flex-col gap-4 border-t !border-opacity-50"
>
  {#if siteConfig.footer.navLinks && siteConfig.footer.navLinks.length > 0}
    <div class="flex flex-wrap gap-4">
      {#each siteConfig.footer.navLinks as link, index}
        <a
          aria-label={link.text}
          target={getLinkTarget(link.href)}
          class="hover:text-primary transition-colors duration-200 cursor-pointer flex items-center"
          href={link.href}
        >
          {link.text}
        </a>
        {#if index < siteConfig.footer.navLinks.length - 1}
          <span class="opacity-70"> / </span>
        {/if}
      {/each}
    </div>
  {/if}
  <div class="flex">
    <a
      class="hover:text-primary transition-colors duration-200 cursor-pointer"
      href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
      target="_blank">CC BY-NC-SA 4.0</a
    >
    <span
      >&nbsp;&nbsp;&copy;&nbsp;&nbsp;{new Date().getFullYear()}&nbsp;&nbsp;{siteConfig.author}.</span
    >
  </div>
</footer>
