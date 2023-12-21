import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { WelcomePage } from "../components/WelcomePage";
const TITLE = "主页";
const DESCRIPTION = "用技术让生活变得更简单。";

export default function Home() {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <Head>
        <title>Shawkry 's blog</title>
      </Head>
      <main>
        <WelcomePage />
      </main>
    </Layout>
  );
}
