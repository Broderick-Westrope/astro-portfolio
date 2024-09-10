import type { ProjectData, ProjectGroup } from '@/types'

export const projectData: ProjectGroup[] = [
    {
        title: 'Personal Projects',
        projects: [
            {
                title: 'Tetrigo',
                description: 'Play Tetris in your terminal.',
                icon: 'akar-icons--game-controller',
                href: 'https://github.com/Broderick-Westrope/tetrigo',
            },
        ],
    },
    {
        title: 'Contributions',
        description: 'Open-Source projects that I have contributed to.',
        projects: [
            {
                title: 'Lipgloss',
                description: 'Style definitions for nice terminal layouts.',
                icon: 'akar-icons--sparkles',
                href: 'https://github.com/Broderick-Westrope/lipgloss',
            },
            {
                title: 'Bubbles',
                description: 'TUI components for Bubble Tea.',
                icon: 'akar-icons--grid',
                href: 'https://github.com/charmbracelet/bubbles',
            },
        ],
    },
    {
        title: 'Eventurely',
        description: 'An ongoing, large-scale personal project. Eventurely is a platform for creating, managing, and sharing personal events. This is still in the early stages of development, but you can view some of the source code on GitHub.',
        projects: [
            {
                title: 'Core',
                description: 'An ASP.NET web API containing the bulk of the functionality. This will support all front-end clients.',
                icon: 'akar-icons--computing',
                href: 'https://github.com/Broderick-Westrope/eventurely-core',
            },
            {
                title: 'Web',
                description: 'A Nuxt front-end client for Eventurely. This will be the primary way to interact with the platform.',
                icon: 'akar-icons--globe',
                href: 'https://github.com/Broderick-Westrope/eventurely-nuxt',
            },
            {
                title: 'Auth',
                description: 'A simple auth server using SuperTokens. This will be used to authenticate users across all front-end clients.',
                icon: 'akar-icons--lock-on',
                href: 'https://github.com/Broderick-Westrope/eventurely-nuxt',
            },
        ],
    },
]

export const mentions: string[] = [
    'twpayne/chezmoi',
    'goreleaser/goreleaser',
    'alecthomas/kong',
    'temporalio/temporal',
    'jesseduffield/lazygit',
    'starship/starship',
    'go-chi/chi',
    'charmbracelet/bubbletea',
    'tldr-pages/tldr',
    'wez/wezterm',
    'meditohq/medito-app',
    'LazyVim/LazyVim',
    'usebruno/bruno',
    'stryker-mutator/stryker-net',
]