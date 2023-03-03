import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

/**Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering. The difference is in when it generates the HTML for a page.
 * Static Generation is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
 * Server-side Rendering is the pre-rendering method that generates the HTML on each request.
Importantly, Next.js let's you choose which pre-rendering form to use for each page.
You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.
 */

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
/**By returning allPostsData inside the props object in getStaticProps, the blog posts will be passed to the Home component as a prop. */
export default function Home({ allPostsData }) {
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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
