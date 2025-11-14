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
            return {
                ...item.data,
                link: `${context.site}/posts/${item.slug}/`,
                pubDate: new Date(item.data.date),
                content: sanitizeHtml(parser.render(item.body), {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
                }),
                author: `${siteConfig.author} <${siteConfig.email}>`,
            }
        }),
    })
}