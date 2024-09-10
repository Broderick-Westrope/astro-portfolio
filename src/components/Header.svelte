<script lang="ts">
  import { onMount } from "svelte";
  import siteConfig from "@/site-config";
  import { getLinkTarget } from "@/utils/link";

  let scroll = 0;
  let oldScroll = 0;

  const navLinks = siteConfig.header.navLinks || [];

  const blurClass = "backdrop-blur-sm";
  const headerHideClasses = [
    "-translate-y-full",
    "transition-transform",
    "duration-300",
  ];

  const socialLinks = siteConfig.socialLinks.filter(
    (link: Record<string, any>) => {
      if (link.header && typeof link.header === "boolean") {
        return link;
      } else if (link.header && typeof link.header === "string") {
        link.icon = link.header.includes("i-") ? link.header : link.icon;
        return link;
      } else {
        return false;
      }
    },
  );

  onMount(() => {
    const navMask = document.getElementById("nav-drawer-mask") as HTMLElement;

    navMask?.addEventListener("touchmove", (event) => {
      event.preventDefault();
    });

    const headerEl = document.getElementById("header") as HTMLElement;
    if (!headerEl) return;

    if (document.documentElement.scrollTop > 100)
      headerEl.classList.add(blurClass);

    const onScroll = () => {
      if (scroll < 50) {
        headerEl.classList.remove(blurClass);
        return;
      } else {
        headerEl.classList.add(blurClass);
      }

      if (scroll - oldScroll > 150) {
        headerEl.classList.add(...headerHideClasses);
        oldScroll = scroll;
      }

      if (oldScroll - scroll > 150) {
        headerEl.classList.remove(...headerHideClasses);
        oldScroll = scroll;
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  function toggleNavDrawer() {
    const drawer = document.getElementById("nav-drawer");
    const mask = document.getElementById("nav-drawer-mask");
    if (!drawer || !mask) return;
    if (drawer.style.transform === `translateX(0%)`) {
      drawer.style.transform = `translateX(-100%)`;
      mask.style.display = `none`;
    } else {
      drawer.style.transform = `translateX(0%)`;
      mask.style.display = `block`;
    }
  }
</script>

<header
  id="header"
  class:backdrop-blur-sm={scroll > 20}
  class="!fixed bg-transparent z-50 w-full h-20 px-6 flex justify-between items-center"
>
  <div class="flex items-center h-full gap-x-6">
    <a
      href="/"
      aria-label="Header Logo Image"
      class="iconify akar-icons--sparkles size-7"
    />
    <nav
      class="sm:flex items-center justify-center hidden flex-wrap gap-x-6 position-initial flex-row"
    >
      {#each navLinks as link (link.text)}
        <a
          aria-label={link.text}
          target={getLinkTarget(link.href)}
          class="opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          href={link.href}
        >
          {link.text}
        </a>
      {/each}
    </nav>
    <div class="sm:hidden h-full flex items-center" on:click={toggleNavDrawer}>
      <span class="iconify akar-icons--three-line-horizontal size-6" />
    </div>
  </div>
  <div class="flex gap-x-6">
    {#each socialLinks as link (link.text)}
      <a
        aria-label={link.text}
        class="iconify {link.icon} hover:text-primary transition-colors duration-200 cursor-pointer size-6"
        target={getLinkTarget(link.href)}
        href={link.href}
      />
    {/each}

    <a
      class="hover:text-primary transition-colors duration-200 cursor-pointer iconify akar-icons--rss size-6"
      target="_blank"
      href="/rss.xml"
      aria-label="RSS"
    />
    <!-- <ThemeController /> -->
  </div>
</header>
<nav
  id="nav-drawer"
  class="-translate-x-full sm:hidden box-border fixed h-screen z-50 left-0 top-0 w-1/2 p-6 text-lg flex flex-col gap-5 transition-all bg-base-200"
>
  <span
    class="iconify akar-icons--arrow-left size-6"
    on:click={toggleNavDrawer}
  />
  {#each navLinks as link (link.text)}
    <a
      aria-label={link.text}
      target={getLinkTarget(link.href)}
      class="hover:text-primary transition-colors duration-200 cursor-pointer"
      href={link.href}
      on:click={toggleNavDrawer}
    >
      {link.text}
    </a>
  {/each}
</nav>
<div
  id="nav-drawer-mask"
  class="hidden transition-all content-none fixed top-0 left-0 w-full h-full bg-base-300 z-40 opacity-50"
  on:click={toggleNavDrawer}
/>
