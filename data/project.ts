export type TagType = "favorite" | "react" | "vue" | "mobile" | "product";

export type Project = {
  title: string;
  description: string;
  image?: string;
  website: string;
  source?: string;
  tags: TagType[];
};
export const projects: Project[] = [
  {
    title: "Blog",
    description: "📖 基于 Docusaurus 实现个人博客",
    image: "/img/project/blog.webp",
    website: "https://shawkry.top",
    source: "https://github.com/Shawkry/blog",
    tags: ["favorite", "react", "mobile"],
  },
  {
    title: "TODO",
    description: "🧾 带有数据统计分析的 TODO 应用",
    image: "/img/project/todo.webp",
    website: "https://shawkry.top/project/todo",
    source: "https://github.com/Shawkry/TODO",
    tags: ["favorite", "vue", "mobile", "product"],
  },
  {
    title: "Cloud",
    description: "☁️ 基于 NextCloud 实现的个人网盘",
    image: "/img/project/cloud.webp",
    website: "https://cloud.shawkry.top",
    //source: "http://www.shawkry.top:8088/",
    tags: ["favorite", "mobile", "product"],
  },
  {
    title: "Moon Design(开发中)",
    description: "🌙 专注于现代化设计和用户体验的 React 组件库",
    image: "/img/project/moon-design.webp",
    website: "https://shawkry.top/project/moon-design",
    source: "https://github.com/Shawkry/moon-design",
    tags: ["favorite", "mobile", "react"],
  },
  {
    title: "Serialport-Tool(开发中)",
    description: "🔌 用于调试串口的 Electron 应用",
    image: "/img/project/serialport-tool.webp",
    website: "https://github.com/Shawkry/serialport-tool",
    source: "https://github.com/Shawkry/serialport-tool",
    tags: ["favorite", "react", "product"],
  },
  {
    title: "Rail-Transit",
    description:
      "🚄 轨道交通大数据分析平台；获得大学生服务外包创新创业大赛国赛二等奖",
    image: "/img/project/rail-transit.webp",
    website: "https://shawkry.top/project/rail-transport",
    source: "https://github.com/Shawkry/rail-transit",
    tags: ["vue"],
  },
  {
    title: "Covid-19(不再维护)",
    description:
      "😷 疫情大数据分析；获得计算机设计大赛国赛三等奖；因疫情已成历史，部分数据丢失，故不再维护",
    image: "/img/project/covid-19.webp",
    website: "https://www.shawkry.top/project/covid-19/",
    source: "https://github.com/Shawkry/covid-19",
    tags: ["vue"],
  },
  {
    title: "Christmas-Tree",
    description: "🎄 3D圣诞树（2021版）",
    image: "/img/project/christmas-tree.webp",
    website: "https://shawkry.top/project/christmas-tree",
    source: "https://github.com/Shawkry/christmas-tree",
    tags: ["vue", "mobile"],
  },
];

export type Tag = {
  label: string;
  description: string;
  color: string;
};

export const Tags: Record<TagType, Tag> = {
  favorite: {
    label: "喜爱",
    description: "我最喜欢的项目",
    color: "volcano",
  },
  react: {
    label: "React",
    description: "前端届的手动挡",
    color: "geekblue",
  },
  vue: {
    label: "Vue",
    description: "前端届的自动挡",
    color: "green",
  },
  mobile: {
    label: "移动端",
    description: "适配移动端的项目",
    color: "orange",
  },
  product: {
    label: "产品",
    description: "完善的产品",
    color: "purple",
  },
};
