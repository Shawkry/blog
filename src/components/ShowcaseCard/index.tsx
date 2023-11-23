import React from "react";
import Image from "@theme/IdealImage";
import clsx from "clsx";
import { Tag, Tooltip } from "antd";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import { type Project, Tags } from "@site/data/project";

export const ShowcaseCard = (props: { project: Project }) => {
  const { project } = props;
  return (
    <div className={styles.showcaseCard}>
      {project?.image && (
        <div className={styles.showcaseCardImage}>
          <Image src={project.image} alt={project.title} img={project.image} />
        </div>
      )}

      <div className={styles.showcaseContent}>
        <div className={styles.showcaseCardHeader}>
          <h4 className={styles.showcaseCardTitle}>
            <Link href={project.website} className={styles.showcaseCardLink}>
              {project.title}
            </Link>
          </h4>
          {project.source && (
            <Link
              href={project.source}
              className={clsx(
                "button button--secondary button--sm",
                styles.showcaseCardSrcBtn,
              )}
            >
              源码
            </Link>
          )}
        </div>
        <p className={styles.showcaseCardBody}>{project.description}</p>
      </div>
      <ul className={clsx("card__footer", styles.showcaseFooter)}>
        {project.tags &&
          project.tags.map((item, index) => {
            return (
              <Tooltip title={Tags[item]["description"]} key={index}>
                <Tag color={Tags[item]["color"]} className={styles.tag}>
                  {Tags[item]["label"]}
                </Tag>
              </Tooltip>
            );
          })}
      </ul>
    </div>
  );
};
