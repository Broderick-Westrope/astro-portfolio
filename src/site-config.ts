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
            text: 'LinkedIn',
            // TODO: Add linkedin URL
            href: '',
            icon: 'akar-icons--linkedin-v1-fill',
        },
        {
            text: 'Email',
            href: 'mailto:brodie.westrope@gmail.com',
            icon: 'akar-icons--envelope',
        }
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
                text: 'Projects',
                href: '/projects',
            },
            {
                text: 'CV',
                href: 'https://github.com/Broderick-Westrope/broderick-westrope/blob/main/CV/cv.pdf'
            }
        ],
    },
    page: {
        blogLinks: [
            {
                text: 'All',
                href: '/blog',
            },
            {
                text: 'Posts',
                href: '/blog/posts',
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
            {
                text: 'Built with Astro',
                href: 'https://astro.build',
            },
            {
                text: 'Inspired by Vitesse',
                href: 'https://github.com/kieranwong9865/astro-theme-vitesse',
            }
        ],
    },
}

export default siteConfig