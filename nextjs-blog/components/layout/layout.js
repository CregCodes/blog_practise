import Head from "next/head";
import Image from "next/image";
import Navbar from "../navbar/navbar";
import styles from "./layout.module.css";
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";

/**Included in layout:
 *meta tags (like og:image), which are used to describe a page's content
Boolean home prop which will adjust the size of the title and the image
“Back to home” link at the bottom if home is false
Added images with next/image, which are preloaded with the priority attribute
 */

const name = "Mildly Interesting";
export const siteTitle = "Mildly Interesting";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Navbar />
      <Head>
        <link rel="icon" href="/images/profile.jpg" />
        <meta
          name="description"
          content="Building a time capsule blog project"
        />

        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt="Robert Redford nodding picture"
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt="Robert Redford nodding picture"
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back To Home</Link>
        </div>
      )}
    </div>
  );
}
