import { addIconSelectors } from '@iconify/tailwind'
import daisyui from 'daisyui'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {},
  plugins: [
    daisyui,
    addIconSelectors(['akar-icons']),
    typography,
  ],
  daisyui: {
    themes: [
      {
        dark: {
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
        light: {
          "primary": "#9854f1",
          "secondary": "#007197",
          "accent": "#6172b0",
          "neutral": "#b4b5b9",
          "base-100": "#e1e2e7",
          "info": "#2e7de9",
          "success": "#587539",
          "warning": "#8c6c3e",
          "error": "#f52a65",
        },
      },
    ],
  },
}