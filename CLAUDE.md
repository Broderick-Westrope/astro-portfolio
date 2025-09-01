# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Dev server**: `npm run dev` - Start Astro development server with hot reload
- **Build**: `npm run build` - TypeScript check followed by production build
- **Preview**: `npm run preview` - Preview production build locally
- **Astro CLI**: `npm run astro` - Access Astro CLI commands

## Architecture Overview

This is a personal portfolio website built with Astro, Svelte, and Tailwind CSS. It follows a modern static site generator approach with component-based architecture.

### Tech Stack
- **Astro**: Static site generator with SSG/SSR capabilities
- **Svelte**: Component framework for interactive UI elements
- **Tailwind CSS + DaisyUI**: Utility-first CSS with component library
- **TypeScript**: Type safety throughout the codebase
- **MDX**: Markdown with JSX for blog content

### Project Structure
- `src/pages/`: File-based routing (Astro pages, API endpoints)
- `src/components/`: Reusable Svelte components
- `src/layouts/`: Astro layout components
- `src/content/`: Content collections (blog posts, pages)
- `src/utils/`: Utility functions for posts, links, etc.
- `src/site-config.ts`: Central configuration for site metadata, navigation, social links

### Content Management
- Uses Astro Content Collections with Zod schema validation
- Blog posts live in `src/content/blog/` as MDX files
- Content schema defined in `src/content/config.ts`
- Automatic RSS feed generation at `/rss.xml`

### Styling System
- Custom DaisyUI theme with dark/light mode variants
- Theme colors defined in `tailwind.config.js`
- Iconify integration with Akar Icons set
- Typography plugin for blog content styling

### Key Features
- Portfolio sections (projects, contributions, mentions)
- Blog with posts and talks categorization
- MTG Draft Calculator tool at `/mtg-draft-calculator`
- Theme switching functionality
- Responsive design with mobile-first approach

### Special Pages
- Dynamic blog routing via `[...slug].astro`
- Project data managed in `src/pages/projects/data.ts`
- Custom 404 page and robots.txt generation

The site is deployed to `westrope.dev` and emphasizes performance, accessibility, and SEO optimization through Astro's static generation capabilities.