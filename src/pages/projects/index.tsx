import React from "react";
import Layout from "@theme/Layout";
import { Button } from "antd";
import styles from "@site/src/pages/projects/index.module.css";
import { ShowcaseCard } from "@site/src/components/ShowcaseCard";
import { projects } from "@site/data/project";
import Link from "@docusaurus/Link";
const ProjectPage = () => {
  return (
    <Layout description="用技术让生活变得更简单。">
      <div className={styles.projectPage}>
        <div className={styles.header}>
          <h1>开源项目</h1>
          <p className={styles.description}>
            开源才能改变世界，不怕代码写得太差，就怕不好意思拿出来 review 🧑‍💻
          </p>
          <Link href={"https://github.com/Shawkry"}>
            <Button type="primary">前往 Github</Button>
          </Link>
        </div>
        <div className={styles.projectList}>
          {projects.map((project, index) => (
            <ShowcaseCard project={project} key={index} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default ProjectPage;
