export const siteConfig = {
  author: 'Broderick Westrope',
  title: 'Broderick Westrope',
  subtitle: 'Portfolio, Blog, Expose.',
  description: 'Portfolio, Blog, Expose.',
  image: {
    src: '/preview.jpg',
    alt: 'Kamakura theme for Astro - Supports Vue and UnoCSS.',
  },
  email: 'broderickwestrope@gmail.com',
  headerNavLinks: [
    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'Blog',
      href: '/blog',
    },
    {
      text: 'Projects',
      href: '/projects',
    },
  ],
  hero: {
    title: 'Welcome',
    image: {
      lightSrc: 'hero/light.png',
      darkSrc: 'hero/dark.png',
      alt: 'An absurd little boy with big dreams.',
    },
    socialLinks: [],
  },
  pageNavLinks: [
    {
      text: 'Blog',
      href: '/blog',
    },
    {
      text: 'Notes',
      href: '/notes',
    },
    {
      text: 'Reading',
      href: '/reading',
    },
  ],
  projects: [
    {
      title: 'Develop Templates',
      projects: [
        {
          text: 'Frosty Web',
          description: 'A clean and minimalist website template designed to showcase content with style.',
          icon: 'i-carbon-webhook',
          href: '',
        },
      ],
    },
    {
      title: 'Framework',
      projects: [
        {
          text: 'Pixel Craft',
          description: 'Frontend framework for crafting pixel-perfect web applications with a responsive design.',
          icon: 'i-carbon-pen-fountain',
          href: '',
        },
        {
          text: 'Aurora UI',
          description: 'Modern UI library designed to streamline frontend development with modular components.',
          icon: 'i-carbon-mountain',
          href: '',
        },
        {
          text: 'Nimbus CSS',
          description: 'Lightweight CSS framework for building responsive websites with a flexible grid system.',
          icon: 'i-carbon-face-satisfied',
          href: '',
        },
      ],
    },
    {
      title: 'Library',
      projects: [
        {
          text: 'Zenith Scroll',
          description: 'Smooth-scrolling JavaScript library for creating immersive scrolling experiences.',
          icon: '',
          href: '',
        },
        {
          text: 'Polaris JS',
          description: 'Lightweight JavaScript library for creating smooth animations and transitions.',
          icon: 'i-carbon-tools-alt',
          href: '',
        },
      ],
    },
  ],
  footerNavLinks: [
    {
      text: 'About',
      href: '/about',
    },
    {
      text: 'Sponsor',
      href: '/sponsor',
    },
    {
      text: 'Contact Me',
      href: 'mailto:broderickwestrope@gmail.com',
    },
    {
      text: 'Github Repo',
      href: 'https://github.com/Broderick-Westrope/astro-theme-kamakura',
    },
  ],
}

export default siteConfig
