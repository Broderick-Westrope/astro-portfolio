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
            {
                title: 'Amalgo',
                description: 'CLI tool for creating single-file snapshots of multiple (code) files.',
                icon: 'akar-icons--file',
                href: 'https://github.com/Broderick-Westrope/amalgo',
            },
            {
                title: 'MTG Draft Calculator',
                description: 'A simple web page for players of the card game "Magic: the Gathering".',
                icon: 'akar-icons--calculator',
                href: 'https://www.westrope.dev/mtg-draft-calculator',
            },
            {
                title: 'Soothe',
                description: 'A mobile app created to help people managing chronic pain. This is a BIG deal and a work-in-progress; keep an eye out for more information.',
                icon: 'akar-icons--health',
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
                href: 'https://github.com/charmbracelet/lipgloss',
            },
            {
                title: 'Bubbles',
                description: 'TUI components for Bubble Tea.',
                icon: 'akar-icons--grid',
                href: 'https://github.com/charmbracelet/bubbles',
            },
            {
                title: 'connect-dart',
                description: 'The Dart implementation of Connect RPC.',
                icon: 'akar-icons--network',
                href: 'https://github.com/connectrpc/connect-dart',
            },
            {
                title: 'charmbracelet/x',
                description: 'Charm experimental packages.',
                icon: 'akar-icons--telescope',
                href: 'https://github.com/charmbracelet/x',
            },
        ],
    },
]

export const mentions: string[] = [
    'Senryoku/Draftmancer',
    'uber-go/zap',
    'dekkerglen/CubeCobra',
    'nats-io/nats.go',
    'DiceDB/dice',
    'gohugoio/hugo',
    'vbd/Fieldnotes',
    'knadh/koanf',
    'destel/rill',
    'charmbracelet/sequin',
    'sammcj/gollama',
    'go-jet/jet',
    'signalapp/libsignal',
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