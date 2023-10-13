import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { WelcomePage } from "../components/WelcomePage";

export default function Home() {
  return (
    <Layout description="用技术让生活变得更简单。">
      <Head>
        <title>彼得潘的永无岛</title>
      </Head>
      <main>
        <WelcomePage />
      </main>
    </Layout>
  );
}
