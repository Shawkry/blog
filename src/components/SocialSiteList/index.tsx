import React from "react";
import styles from "../../pages/index.module.css";
const SVG_LIST = [
  {
    title: "github",
    Svg: require("../../../static/img/socialSiteLogo/github.svg").default,
    link: "https://github.com/Shawkry",
  },
  {
    title: "zhihu",
    Svg: require("../../../static/img/socialSiteLogo/zhihu.svg").default,
    link: "https://www.zhihu.com/people/shawkry",
  },
  {
    title: "juejin",
    Svg: require("../../../static/img/socialSiteLogo/juejin.svg").default,
    link: "https://juejin.cn/user/1955357623320968",
  },
  {
    title: "npm",
    Svg: require("../../../static/img/socialSiteLogo/npm.svg").default,
    link: "https://www.npmjs.com/~shawkry",
  },
];
const SvgBox = ({ Svg, link }) => {
  return (
    <a href={link} target="_blank">
      <Svg className={styles.svg} />
    </a>
  );
};
export const SocialSiteList = () => {
  return (
    <div className={styles.svgContainer}>
      {SVG_LIST.map((item) => {
        return <SvgBox {...item} key={item.title} />;
      })}
    </div>
  );
};
