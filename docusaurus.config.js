// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
const path = require("path");
// const lightCodeTheme = require("prism-react-renderer/themes/github");
// const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const config = {
  title: "Shawkry 的blog",
  url: "https://shawkry.top",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  projectName: "blog",
  tagline: "用技术让生活更简单！",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "zh-CN",
    locales: ["zh-CN"],
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */

    ({
      metadata: [
        {
          name: "description",
          content: "Shawkry 的blog，用技术让生活更简单！",
        },
        {
          name: "keywords",
          content: "Shawkry, 彼得潘的永无岛, 曹霄越",
        },
        {
          name: "keywords",
          content:
            "blog, Docusaurus, javascript, typescript, node, react, vue, web",
        },
        {
          name: "keywords",
          content: "博客,开源博客,编程爱好者, Web开发",
        },
      ],
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
                label: "🌐 Web开发",
                to: "docs/web/",
              },
              {
                label: "👨‍🎨 软件设计",
                to: "docs/software-design/",
              },
              {
                label: "🔧 硬件相关",
                to: "docs/hardware/",
              },
            ],
          },
          {
            label: "🚗 更多内容",
            position: "right",
            items: [
              {
                label: "🧑‍💻 开源项目",
                to: "projects",
              },
              {
                type: "docSidebar",
                sidebarId: "lifeSidebar",
                label: "🍊 生活乐趣",
              },
            ],
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
        <a style='text-decoration:none' href='http://beian.miit.gov.cn'><div style='color:white'>粤ICP备2021117025号</div></a>`,
      },
      // prism: {
      //   theme: lightCodeTheme,
      //   darkTheme: darkCodeTheme,
      // },
      zoom: {
        selector: ".markdown :not(em) > img",
        background: {
          light: "rgb(255, 255, 255)",
          dark: "rgb(50, 50, 50)",
        },
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
        gtag: {
          trackingID: "G-9HPYNML0Y3",
          anonymizeIP: true,
        },
      }),
    ],
  ],
  plugins: [
    "docusaurus-plugin-image-zoom",
    path.resolve(__dirname, "./src/plugin/plugin-baidu-analytics"),
    ["@docusaurus/plugin-ideal-image", { disableInDev: false }],
  ],
};

module.exports = config;
