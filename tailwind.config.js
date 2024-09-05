const { addIconSelectors } = require('@iconify/tailwind')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {},
  plugins: [
    require('daisyui'),
    addIconSelectors(['akar-icons']),
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    themes: [
      {
        tokyoNightMoon: {
          "primary": "#c099ff",
          "secondary": "#82aaff",
          "accent": "#828bb8",
          "neutral": "#c8d3f5",
          "base-100": "#050014",
          "info": "#86e1fc",
          "success": "#c3e88d",
          "warning": "#ffc777",
          "error": "#ff757f",
        },
      },
    ],
  },
}
