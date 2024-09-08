import type { CollectionEntry } from 'astro:content'

export type PostKey = 'blog'

export type CollectionPosts = CollectionEntry<PostKey>

export type Pages = 'pages'

export type CollectionPages = CollectionEntry<Pages>

export type ProjectGroup = {
    title: string
    description?: string
    projects: Array<ProjectData>
}

export type ProjectData = {
    title: string
    description: string | null
    icon?: string
    href: string
}
