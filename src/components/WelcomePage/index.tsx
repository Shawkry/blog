import React from "react";
import styles from "@site/src/pages/index.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { SocialSiteList } from "@site/src/components/SocialSiteList";

export const WelcomePage = () => {
  return (
    <div className="hero">
      <div className={styles.welcome_intro}>
        <h1 className={styles.hero_title}>
          <span style={{ color: "var(--ifm-color-primary)" }}>Shawkry</span> ~
          <div>略带文艺的小码农</div>
        </h1>
        <p className="hero__subtitle">用技术让生活变得更简单 🧐</p>
        <SocialSiteList />
      </div>
      <div className={styles.welcome_svg}>
        <img src={useBaseUrl("/img/prince.gif")} alt={""} />
      </div>
    </div>
  );
};
