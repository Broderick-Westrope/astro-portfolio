import { defineCollection, z } from 'astro:content'

const postsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  duration: z.string().optional(),
  image: z
    .object({
      src: z.string(),
      alt: z.string().optional(),
    })
    .optional(),
  date: z
    .string()
    .or(z.date())
    .transform((val: string | number | Date) => new Date(val).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })),
  draft: z.boolean().optional().default(false),
  lang: z.string().optional().default('en-US'),
  tag: z.string().optional(),
  redirect: z.string().optional(),
  video: z.boolean().optional(),
  recording: z.boolean().optional(),
})

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string().optional(),
      })
      .optional(),
  }),
})

const blogCollection = defineCollection({
  type: 'content',
  schema: postsSchema,
})


const readingCollection = defineCollection({
  type: 'content',
  schema: postsSchema,
})

export const collections = {
  'pages': pagesCollection,
  'blog': blogCollection,
  'reading': readingCollection
}
