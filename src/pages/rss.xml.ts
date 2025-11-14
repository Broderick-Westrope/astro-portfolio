import rss from '@astrojs/rss'
import siteConfig from '@/site-config'
import { getPosts } from '@/utils/posts'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'

const parser = new MarkdownIt()

interface Context {
    site: string
}

export async function GET(context: Context) {
    const posts = await getPosts()

    return rss({
        title: siteConfig.title,
        description: siteConfig.description,
        site: context.site,
        items: posts!.map((item) => {
            const html = parser.render(item.body)
            // Convert relative image URLs to absolute URLs
            const htmlWithAbsoluteUrls = html.replace(
                /src="(?!https?:\/\/)([^"]+)"/g,
                `src="${context.site}$1"`
            )
            return {
                ...item.data,
                link: `${context.site}/posts/${item.slug}/`,
                pubDate: new Date(item.data.date),
                content: sanitizeHtml(htmlWithAbsoluteUrls, {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
                }),
                author: `${siteConfig.author} <${siteConfig.email}>`,
            }
        }),
    })
}