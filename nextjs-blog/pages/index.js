import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          [Hey I'm Craig, I'm a somewhat Design Researcher and somehow Junior
          Developer.]
        </p>
        <p>
          [I'm based in the UK- and I'd love to work with you. You can contact
          me <a href="https://twitter.com/CraigGrady8">here.]</a>
        </p>
      </section>
    </Layout>
  );
}
