import Layout from "../../components/layout/layout";
import Head from "next/head";
import Date from "../../components/date/date";
import ScrollTop from "../../components/scrollTop/scrollTop";
import utilStyles from "../../styles/utils.module.css";
import { getAllArchiveIds, getArchiveData } from "../../lib/archive";

/* Can not rename the  **/
export async function getStaticProps({ params }) {
  const archiveData = await getArchiveData(params.id);
  return {
    props: {
      archiveData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllArchiveIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Archive({ archiveData }) {
  return (
    <Layout>
      <Head>
        <title>{archiveData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{archiveData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={archiveData.date} />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: archiveData.contentHtml }}
          className={utilStyles.headingMd}
        />
      </article>
      <ScrollTop />
    </Layout>
  );
}
