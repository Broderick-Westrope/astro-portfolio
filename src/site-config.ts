export const siteConfig = {
    author: 'Broderick Westrope',
    title: 'Broderick Westrope',
    subtitle: 'A professional portfolio, blog, etc.',
    // TODO: fix up these descriptions
    description: 'A Minimal, SEO-friendly portfolio and blog theme for Astro.',
    image: {
        src: '/hero.jpg',
        alt: 'Website Main Image',
    },
    email: 'brodie.westrope@gmail.com',
    socialLinks: [
        {
            text: 'GitHub',
            href: 'https://github.com/Broderick-Westrope',
            icon: 'akar-icons--github-outline-fill',
        },
        {
            text: 'Linkedin',
            // TODO: Add linkedin URL
            href: '',
            icon: 'akar-icons--linkedin-v1-fill',
        },
    ],
    header: {
        // TODO: replace logo
        logo: {
            src: '/favicon.svg',
            alt: 'Logo Image',
        },
        navLinks: [
            {
                text: 'Blog',
                href: '/blog',
            },
            {
                text: 'Notes',
                href: '/blog/notes',
            },
            {
                text: 'Talks',
                href: '/blog/talks',
            },
            {
                text: 'Projects',
                href: '/projects',
            },
        ],
    },
    page: {
        blogLinks: [
            {
                text: 'Blog',
                href: '/blog',
            },
            {
                text: 'Notes',
                href: '/blog/notes',
            },
            {
                text: 'Talks',
                href: '/blog/talks',
            },
        ],
    },
    footer: {
        navLinks: [
            {
                text: 'GitHub Repository',
                href: 'https://github.com/Broderick-Westrope/astro-portfolio',
            },
        ],
    },
}

export default siteConfig