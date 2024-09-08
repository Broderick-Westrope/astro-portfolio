import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    site: 'https://westrope.dev/',
    integrations: [mdx(), sitemap(), tailwind(), svelte()],
    markdown: {
        shikiConfig: {
            themes: {
                light: 'github-light-default',
                dark: 'github-dark-default',
            },
            wrap: true,
        },
    },
});