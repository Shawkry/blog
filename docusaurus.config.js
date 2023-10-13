// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const config = {
  title: "彼得潘的永无岛",
  tagline: "WelcomePage to my blog!",
  favicon: "img/favicon.ico",
  url: "https://shawkry.top",
  baseUrl: "/blog",
  organizationName: "Shawkry",
  projectName: "Shawkry's Blog",
  // onBrokenLinks: "throw",
  // onBrokenMarkdownLinks: "warn",
  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "ignore",
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */

    ({
      // Replace with your project's social card
      // image: "img/docusaurus-social-card.jpg",

      navbar: {
        title: "Shawkry 's Blog",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "attemptSidebar",
            position: "right",
            label: "🔮 好玩的尝试",
          },
          {
            label: "📒 学习笔记",
            position: "right",
            items: [
              {
                label: "Web开发",
                to: "docs/web/",
              },
              {
                label: "软件设计",
                to: "docs/software-design/",
              },
              {
                label: "硬件相关",
                to: "docs/hardware/",
              },
            ],
          },
          {
            type: "docSidebar",
            sidebarId: "lifeSidebar",
            position: "right",
            label: "🍊 生活兴趣",
          },
          {
            href: "https://github.com/Shawkry",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} Shawkry, Inc. Built with Docusaurus.
        <a style='text-decoration:none' href='http://beian.miit.gov.cn'><div style='color:white'>粤ICP备2021117025号-2</div></a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "zh"],
      },
    ],
  ],
};

module.exports = config;
