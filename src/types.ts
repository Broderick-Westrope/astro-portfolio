import type { CollectionEntry } from 'astro:content'

export type PostKey = 'blog'

export type CollectionPosts = CollectionEntry<PostKey>

export type Pages = 'pages'

export type CollectionPages = CollectionEntry<Pages>

export type ProjectData = Array<{
    title: string
    subtitle?: string
    projects: Array<{
        text: string
        description?: string
        icon?: string
        href: string
    }>
}>

export type MentionData = Array<{
    text: string
    description: string | null
    href: string
}>
