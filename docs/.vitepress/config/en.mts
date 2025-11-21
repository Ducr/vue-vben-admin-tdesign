import type { DefaultTheme } from 'vitepress';

import { defineConfig } from 'vitepress';

import { version } from '../../../package.json';

export const en = defineConfig({
  description: 'Vben Admin TDesign - TDesign version SPA independently split from Vue Vben Admin v5.5.9',
  lang: 'en-US',
  themeConfig: {
    darkModeSwitchLabel: 'Theme',
    darkModeSwitchTitle: 'Switch to Dark Mode',
    docFooter: {
      next: 'Next Page',
      prev: 'Previous Page',
    },
    editLink: {
      pattern:
        'https://github.com/Ducr/vue-vben-admin-tdesign/edit/main/docs/src/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      copyright: `Copyright © 2020-${new Date().getFullYear()} Ducr`,
      message: 'Released under the MIT License.',
    },
    langMenuLabel: 'Language',
    lastUpdated: {
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
      text: 'Last updated on',
    },
    lightModeSwitchTitle: 'Switch to Light Mode',
    nav: nav(),
    outline: {
      label: 'Navigate',
    },
    returnToTopLabel: 'Back to top',
    sidebar: {
      '/en/commercial/': {
        base: '/en/commercial/',
        items: sidebarCommercial(),
      },
      '/en/guide/': { base: '/en/guide/', items: sidebarGuide() },
    },
  },
});

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      collapsed: false,
      text: 'Introduction',
      items: [
        {
          link: 'introduction/vben',
          text: 'About Vben Admin',
        },
        {
          link: 'introduction/why',
          text: 'Why Choose Us?',
        },
        { link: 'introduction/quick-start', text: 'Quick Start' },
        { link: 'introduction/thin', text: 'Lite Version' },
      ],
    },
    {
      text: 'Basics',
      items: [
        { link: 'essentials/concept', text: 'Basic Concepts' },
        { link: 'essentials/development', text: 'Local Development' },
        { link: 'essentials/route', text: 'Routing and Menu' },
        { link: 'essentials/settings', text: 'Configuration' },
        { link: 'essentials/icons', text: 'Icons' },
        { link: 'essentials/styles', text: 'Styles' },
        { link: 'essentials/external-module', text: 'External Modules' },
        { link: 'essentials/build', text: 'Build and Deployment' },
        { link: 'essentials/server', text: 'Server Interaction and Data Mock' },
      ],
    },
    {
      text: 'Advanced',
      items: [
        { link: 'in-depth/login', text: 'Login' },
        { link: 'in-depth/theme', text: 'Theme' },
        { link: 'in-depth/access', text: 'Access Control' },
        { link: 'in-depth/locale', text: 'Internationalization' },
        { link: 'in-depth/features', text: 'Common Features' },
        { link: 'in-depth/check-updates', text: 'Check Updates' },
        { link: 'in-depth/loading', text: 'Global Loading' },
        { link: 'in-depth/ui-framework', text: 'UI Framework Switching' },
      ],
    },
    {
      text: 'Engineering',
      items: [
        { link: 'project/standard', text: 'Standards' },
        { link: 'project/cli', text: 'CLI' },
        { link: 'project/dir', text: 'Directory Explanation' },
        { link: 'project/test', text: 'Unit Testing' },
        { link: 'project/tailwindcss', text: 'Tailwind CSS' },
        { link: 'project/changeset', text: 'Changeset' },
        { link: 'project/vite', text: 'Vite Config' },
      ],
    },
    {
      text: 'Others',
      items: [
        { link: 'other/project-update', text: 'Project Update' },
        { link: 'other/remove-code', text: 'Remove Code' },
        { link: 'other/faq', text: 'FAQ' },
      ],
    },
  ];
}

function sidebarCommercial(): DefaultTheme.SidebarItem[] {
  return [
    {
      link: 'community',
      text: 'Community',
    },
    {
      link: 'technical-support',
      text: 'Technical-support',
    },
    {
      link: 'customized',
      text: 'Customized',
    },
  ];
}

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      activeMatch: '^/en/(guide|components)/',
      text: 'Doc',
      items: [
        {
          activeMatch: '^/en/guide/',
          link: '/en/guide/introduction/vben',
          text: 'Guide',
        },
        // {
        //   activeMatch: '^/en/components/',
        //   link: '/en/components/introduction',
        //   text: 'Components',
        // },
        {
          text: 'Historical Versions',
          items: [
            {
              link: 'https://doc.vvbin.cn',
              text: '2.x Version Documentation',
            },
          ],
        },
      ],
    },
    {
      text: 'Demo',
      items: [
        {
          text: 'Vben Admin',
          items: [
            {
              link: 'https://ducrong.com/vue-vben-admin-tdesign',
              text: 'TDesign Version (Current)',
            },
            {
              link: 'https://ducrong.com/vue-vben-admin-antd',
              text: 'Ant Design Vue Version',
            },
            {
              link: 'https://ducrong.com/vue-vben-admin-ele',
              text: 'Element Plus Version',
            },
            {
              link: 'https://ducrong.com/vue-vben-admin-naive',
              text: 'Naive UI Version',
            },
          ],
        },
        {
          text: 'Others',
          items: [
            {
              link: 'https://vben.vvbin.cn',
              text: 'Vben Admin 2.x',
            },
          ],
        },
      ],
    },
    {
      text: version,
      items: [
        {
          link: 'https://github.com/Ducr/vue-vben-admin-tdesign/releases',
          text: 'Changelog',
        },
        {
          link: 'https://github.com/Ducr/vue-vben-admin-tdesign',
          text: 'Roadmap',
        },
        {
          link: 'https://github.com/Ducr/vue-vben-admin-tdesign/blob/main/.github/contributing.md',
          text: 'Contribution',
        },
      ],
    },
    {
      link: '/commercial/technical-support',
      text: '🦄 Tech Support',
    },
    {
      link: '/sponsor/personal',
      text: '✨ Sponsor',
    },
    {
      link: '/commercial/community',
      text: '👨‍👦‍👦 Community',
    },
    // {
    //   link: '/friend-links/',
    //   text: '🤝 Friend Links',
    // },
  ];
}
