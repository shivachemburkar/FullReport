/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const users = require('./showcase.json');
const versions = require('./versions.json');

const lastVersion = versions[0];
const copyright = `Copyright © ${new Date().getFullYear()} Meta Platforms, Inc.`;

const commonDocsOptions = {
  breadcrumbs: false,
  showLastUpdateAuthor: false,
  showLastUpdateTime: true,
  editUrl:
    'https://github.com/facebook/react-native-website/blob/main/website/',
  remarkPlugins: [require('@react-native-website/remark-snackplayer')],
};

const isDeployPreview = process.env.PREVIEW_DEPLOY === 'true';

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'CWMA 2023 WQIP Report',
  tagline: 'A framework for building native apps using React',
  organizationName: 'MOE',
  projectName: 'wqip',
  url: 'https://report.ogawa.us/',
  baseUrl: '/',
  clientModules: [
    require.resolve('./modules/snackPlayerInitializer.js'),
    require.resolve('./modules/jumpToFragment.js'),
  ],
  trailingSlash: false, // because trailing slashes can break some existing relative links
  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/focus-visible@5.2.0/dist/focus-visible.min.js',
      defer: true,
    },
    {
      src: 'https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd8ryO5qrZo8Exadq9qmt1wtm4_2FdZGEAKHDFEt_2BBlwwM4.js',
      defer: true,
    },
    {src: 'https://snack.expo.dev/embed.js', defer: true},
    {src: 'https://platform.twitter.com/widgets.js', async: true},
  ],
  favicon: 'img/favicon.ico',
  titleDelimiter: '·',
  customFields: {
    users,
    facebookAppId: '1677033832619985',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  onBrokenLinks: 'throw',
  webpack: {
    jsLoader: isServer => ({
      loader: require.resolve('esbuild-loader'),
      options: {
        loader: 'tsx',
        format: isServer ? 'cjs' : undefined,
        target: isServer ? 'node12' : 'es2017',
      },
    }),
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.json'),
          editCurrentVersion: true,
          onlyIncludeVersions: isDeployPreview
            ? ['current', ...versions.slice(0, 2)]
            : undefined,
          versions: {
            [lastVersion]: {
              badge: false, // Do not show version badge for last RN version
            },
          },
          ...commonDocsOptions,
        },
        blog: {
          path: 'blog',
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All Blog Posts',
          feedOptions: {
            type: 'all',
            copyright,
          },
        },
        theme: {
          customCss: [
            require.resolve('./src/css/customTheme.scss'),
            require.resolve('./src/css/index.scss'),
            require.resolve('./src/css/showcase.scss'),
            require.resolve('./src/css/versions.scss'),
          ],
        },
        // TODO: GA is deprecated, remove once we're sure data is streaming in GA4 via gtag.
        googleAnalytics: {
          trackingID: 'UA-41298772-2',
        },
        gtag: {
          trackingID: 'G-58L13S6BDP',
        },
      }),
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    [
      'content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'architecture',
        path: 'architecture',
        routeBasePath: '/architecture',
        sidebarPath: require.resolve('./sidebarsArchitecture.json'),
        ...commonDocsOptions,
      }),
    ],
    [
      'content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'contributing',
        path: 'contributing',
        routeBasePath: '/contributing',
        sidebarPath: require.resolve('./sidebarsContributing.json'),
        ...commonDocsOptions,
      }),
    ],
    [
      'content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'community',
        path: 'community',
        routeBasePath: '/community',
        sidebarPath: require.resolve('./sidebarsCommunity.json'),
        ...commonDocsOptions,
      }),
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: ['appInstalled', 'queryString'],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/pwa/manifest-icon-512.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#20232a',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#20232a',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: '/img/pwa/manifest-icon-512.png',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: '/img/pwa/manifest-icon-512.png',
            color: '#06bcee',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            href: '/img/pwa/manifest-icon-512.png',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#20232a',
          },
        ],
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: 'reactconf2024',
        content:
          '<a target="_blank" rel="noopener noreferrer" href="https://www.carlsbadwatershed.org/">Return Home</a>',
        backgroundColor: '#20232a',
        textColor: '#fff',
        isCloseable: false,
      },
      prism: {
        defaultLanguage: 'jsx',
        theme: require('./core/PrismTheme'),
        additionalLanguages: [
          'diff',
          'bash',
          'json',
          'java',
          'kotlin',
          'objectivec',
          'swift',
          'groovy',
          'ruby',
          'flow',
        ],
      },
      navbar: {
        title: 'MOE',
        logo: {
          src: 'img/logo.png',
          alt: 'React Native',
        },
        style: 'dark',
        items: [
          {
            label: 'Carlsbad WMA',
            type: 'dropdown',
            position: 'right',
            items: [
              {
                label: 'WQIP AR23 Report Breakdown',
                type: 'doc',
                docId: 'overview',
              },
              {
                label: 'Attachments',
                type: 'doc',
                docId: 'components-and-apis',
              },
              {
                label: 'Appendices',
                type: 'doc',
                docId: 'accessibilityinfo',
              },
            ],
          },
          {
            type: 'doc',
            docId: 'overview',
            label: 'Data Driven Results',
            position: 'right',
            docsPluginId: 'contributing',
          },
          {
            type: 'doc',
            docId: 'overview',
            label: 'PDF Version',
            position: 'right',
            docsPluginId: 'community',
          },
          {
            to: '/showcase',
            label: 'Projects',
            position: 'right',
          },

          // {
          //   type: 'docsVersionDropdown',
          //   position: 'left',
          //   dropdownActiveClassDisabled: true,
          //   // dropdownItemsAfter: [
          //   //   {
          //   //     to: '/versions',
          //   //     label: 'All versions',
          //   //   },
          //   // ],
          // },
        ],
      },
      image: 'img/logo-og.png',
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Previous Years',
            items: [
              {
                label: 'AR22',
                to: 'docs/getting-started',
              },
              {
                label: 'AR21',
                to: 'docs/components-and-apis',
              },
              {
                label: 'AR20',
                to: 'docs/accessibilityinfo',
              },
            ],
          },
          {
            title: 'Watershed Initiatives',
            items: [
              {
                label: 'Loma Alta Wetlands Enhancement Project',
                to: 'showcase',
              },
              {
                label: 'Agua Hedionda Creek Restoration Project',
                href: 'https://reactnative.directory/',
              },
              {
                label: 'Ultraviolet Bacteria Treatment Facility',
                href: 'https://reactnative.directory/',
              },
              {
                label: 'Spruce Street Channel Rehabilitation Project',
                href: 'https://reactnative.directory/',
              },
            ],
          },
          {
            title: 'Project Clean Water',
            items: [
              {
                label: 'Pledge',
                href: 'https://projectcleanwater.org/share-the-project-clean-water-52-week-pledge/',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/projectcleanwatersd/',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/project-clean-water-sd/about/',
              },
            ],
          },
          {
            title: 'Participate',
            items: [
              {
                label: 'Disposal',
                href: 'https://projectcleanwater.org/dude/',
              },
              {
                label: 'Lifestyle',
                href: 'https://projectcleanwater.org/trash-free/',
              },
              {
                label: 'Pet Waste',
                href: 'https://projectcleanwater.org/doody/',
              },
              {
                label: 'Irrigation',
                href: 'https://projectcleanwater.org/irrigation/',
              },
            ],
          },
        ],
        logo: {
          alt: 'Return Home',
          src: 'img/logo.png',
          href: 'https://www.carlsbadwatershed.org',
        },
      },
      algolia: {
        appId: '8TDSE0OHGQ',
        apiKey: '83cd239c72f9f8b0ed270a04b1185288',
        indexName: 'react-native-v2',
        contextualSearch: true,
      },
      // metadata: [
      //   {
      //     property: 'og:image',
      //     content: 'https://reactnative.dev/img/logo-og.png',
      //   },
      //   {name: 'twitter:card', content: 'summary_large_image'},
      //   {
      //     name: 'twitter:image',
      //     content: 'https://reactnative.dev/img/logo-og.png',
      //   },
      //   {name: 'twitter:site', content: '@reactnative'},
      // ],
    }),
};
