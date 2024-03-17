export const siteConfig = {
  author: 'Broderick Westrope',
  title: 'Broderick Westrope',
  subtitle: 'Portfolio, Blog, Expose.',
  description: 'Portfolio, Blog, Expose.',
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
    socialLinks: [
      {
        href: 'https://www.linkedin.com/in/broderick-westrope/',
        icon: 'i-ri-linkedin-box-fill',
        text: 'LinkedIn',
      },
      {
        href: 'https://github.com/Broderick-Westrope',
        icon: 'i-mingcute-github-fill',
        text: 'GitHub',
      },
    ],
  },
  pageNavLinks: [
    {
      text: 'Blog',
      href: '/blog',
    },
    {
      text: 'Reading',
      href: '/reading',
    },
  ],
  projects: [
    {
      title: 'Eventurely',
      description: 'An experimental app for personal event management. The social media designed to get people... social!',
      projects: [
        {
          text: 'Server',
          description: 'Web server written in Go. Using Connect RPC for the API, PostgreSQL for the database, and sqlc to generate Go code from SQL queries.',
          icon: 'i-iconoir-internet',
          href: 'https://github.com/Broderick-Westrope/eventurely',
        },
        {
          text: 'Mobile',
          description: 'Cross-platform mobile app written with Flutter. Uses Riverpod for state management, Firebase Auth, and a gRPC client.',
          icon: 'i-ant-design-mobile-outlined',
          href: 'https://github.com/Broderick-Westrope/eventurely_flutter',
        },
      ],
    },
    {
      title: 'Go',
      projects: [
        {
          text: 'Tetrigo',
          description: 'Tetris TUI (Terminal User Interface) written in Go following the 2009 Tetris Design Guidelines.',
          icon: 'i-fluent-tetris-app-48-regular',
          href: 'https://github.com/Broderick-Westrope/tetrigo',
        },
        {
          text: 'goenums',
          description: 'CLI tool to generate type safe Go enums using a simple JSON or YAML config file.',
          icon: 'i-carbon-ibm-watsonx-code-assistant',
          href: 'https://github.com/Broderick-Westrope/goenums',
        },
      ],
    },
  ],
  footerNavLinks: [
    {
      text: 'Contact Me',
      icon: 'i-fa6-solid-paper-plane',
      href: 'mailto:broderickwestrope@gmail.com',
    },
    {
      text: 'Site Repo',
      icon: 'i-mingcute-github-fill',
      href: 'https://github.com/Broderick-Westrope/astro-portfolio',
    },
  ],
}

export default siteConfig
