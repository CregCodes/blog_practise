import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../../components/layout/layout";
import utilStyles from "../../styles/utils.module.css";
import Image from "next/image";

export default function Archive() {
  return (
    <Layout Home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.padding1px}>The Archive</h2>
        <p className={utilStyles.padding1px}>
          [Hello again, here you can take a look at some of my previous work]
        </p>
        <p>
          [I've been fortunate enough to work on <b>wide variety</b> of projects
          over the years- so I've written a collection of case studies for some
          of the work I'm most proud of]
        </p>
      </section>
      <section className={utilStyles.headingMd}>
        <h3 className={utilStyles.padding1px}>An Example of</h3>
        <Image
          className={utilStyles.padding1px}
          priority
          src="/images/profile.jpg"
          width={300}
          height={300}
        />
        <Link href="/archive/test">Test Link to Case Study</Link>
      </section>
      <section className={utilStyles.headingMd}>
        <h3 className={utilStyles.padding1px}>Another Example of</h3>
        <Link href="/archive/wise">Changing a Culture</Link>
      </section>
    </Layout>
  );
}
