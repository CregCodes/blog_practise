import Layout from "../../components/layout/layout";
import Head from "next/head";
import Date from "../../components/date/date";
import Navbar from "../../components/navbar/navbar";
import utilStyles from "../../styles/utils.module.css";
import { getAllPostIds, getPostData } from "../../lib/posts";

/**The post page is using the getPostData function in getStaticProps to get the post data and return it as props. */
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

/**paths contains the array of known paths returned by getAllPostIds(), which include the params defined by pages/posts/[id].js.
 * Learn more in the paths key documentation (Next.js docs) */
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  return (
    <>
      <Navbar />
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            className={utilStyles.headingMd}
          />
        </article>
      </Layout>
    </>
  );
}
