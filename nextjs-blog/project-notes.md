### Using clsx library to toggle classes

clsx is a simple library that lets you toggle class names easily. You can install it using npm install clsx or yarn add clsx.

Please take a look at its documentation for more details, but here's the basic usage:

Suppose that you want to create an Alert component which accepts type, which can be 'success' or 'error'.
If it's 'success', you want the text color to be green. If it's 'error', you want the text color to be red.
You can first write a CSS module (e.g. alert.module.css) like this:

.success {
color: green;
}
.error {
color: red;
}

### Using clsx example

```
import styles from './alert.module.css';
import { clsx } from 'clsx';

export default function Alert({ children, type }) {
return (

<div
className={clsx({
[styles.success]: type === 'success',
[styles.error]: type === 'error',
})} >
{children}
</div>
);
}
```

### Customizing PostCSS Config

Out of the box, with no configuration, Next.js compiles CSS using PostCSS.

To customize PostCSS config, you can create a top-level file called postcss.config.js. This is useful if you're using libraries like Tailwind CSS.

### Installing Tailwind to already created project

Here are the steps to add Tailwind CSS. First, install the packages:

npm install -D tailwindcss autoprefixer postcss
Then, create a postcss.config.js:

// postcss.config.js
module.exports = {
plugins: {
tailwindcss: {},
autoprefixer: {},
},
};
We also recommend configuring content sources by specifying the content option on tailwind.config.js:

// tailwind.config.js
module.exports = {
content: [
'./pages/**/*.{js,ts,jsx,tsx}',
'./components/**/*.{js,ts,jsx,tsx}',
// For the best performance and to avoid false positives,
// be as specific as possible with your content configuration.
],
};
To learn more about custom PostCSS configuration, check out the documentation for PostCSS.

### Gray matter- Metadata in MarkDown Files

You might have noticed that each markdown file has a metadata section at the top containing title and date. This is called YAML Front Matter, which can be parsed using a library called gray-matter.

Installing gray-matter
First, install gray-matter which lets us parse the metadata in each markdown file.

npm install gray-matter
Creating the utility function to read the file system
Next, we’ll create a utility function for parsing data from the file system. With this utility function, we’d like to:

Parse each markdown file and get title, date, and file name (which will be used as id for the post URL).
List the data on the index page, sorted by date.
Create a top-level directory called lib in the root directory

### Static Generation & Server Side Rendering

- Static Generation will create the HTML at build time
- SSR will create the HTML on request

Static Generation used for most pages (e.g. when a page loads)
SSR might be used for rendering/ creating elements when needed (e.g. the example of havng on request the Blog Posts which someone might click on to read)

getStaticProps()

- parses markdown files (in example blogs)
- creating an array of objects
- passing this array as a prop into the relevant page component
- showing a preview list of blog posts on home page (in this example)

### Info on getStaticProps()

- This runs on server side (as it's a fetch request to an external source)
  Fetch External API or Query Database
  In lib/posts.js, we’ve implemented getSortedPostsData which fetches data from the file system. But you can fetch the data from other sources, like an external API endpoint, and it’ll work just fine:

export async function getSortedPostsData() {
// Instead of the file system,
// fetch post data from an external API endpoint
const res = await fetch('..');
return res.json();
}

- Next.js polyfills fetch() on both the client and server. You don't need to import it.

- Query the database directly

```
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
// Instead of the file system,
// fetch post data from a database
return databaseClient.query('SELECT posts...')
}
```

- This is possible because getStaticProps only runs on the server-side.
- It will never run on the client-side. It won’t even be included in the JS bundle for the browser.
- That means you can write code such as direct database queries without them being sent to browsers.

### Development vs. Production

In development (npm run dev or yarn dev), getStaticProps runs on every request.
In production, getStaticProps runs at build time. However, this behavior can be enhanced using the fallback key returned by getStaticPaths
Because it’s meant to be run at build time, you won’t be able to use data that’s only available during request time, such as query parameters or HTTP headers.

### Only Allowed in a Page

getStaticProps can only be exported from a page. You can’t export it from non-page files.

One of the reasons for this restriction is that React needs to have all the required data before the page is rendered.

### What If I Need to Fetch Data at Request Time?

Since Static Generation happens once at build time, it's not suitable for data that updates frequently or changes on every user request.

In cases like this, where your data is likely to change, you can use Server-side Rendering. Let's learn more about server-side rendering in the next section.

### Fetching Data at REQUEST time

- On a request (SSR), data is fetched and the HTML is created
- Page request from client
- Fetches external data
- creates array of objects with relevant/ requested data
- Next.js generates the page with this data included

To use Server-side Rendering, you need to export getServerSideProps instead of getStaticProps from your page.

```
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
```

- Because getServerSideProps is called at request time, its parameter (context) contains request specific parameters.

- You should use getServerSideProps only if you need to pre-render a page whose data must be fetched at request time. Time to first byte (TTFB) will be slower than getStaticProps because the server must compute the result on every request, and the result cannot be cached by a CDN without extra configuration.

### Client-side Rendering

If you do not need to pre-render the data, you can also use the following strategy (called Client-side Rendering):

- Statically generate (pre-render) parts of the page that do not require external data.
- When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.

```
This approach works well for user dashboard pages, for example. Because a dashboard is a private, user-specific page, SEO is not relevant, and the page doesn’t need to be pre-rendered. The data is frequently updated, which requires request-time data fetching.

```

### SWR

Next.js has created a React hook for data fetching called SWR.
https://swr.vercel.app/

- If you’re fetching data on the client side. It handles caching, revalidation, focus tracking, refetching on interval, and more

```
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
```

### Dynamic Routes

Things you can do/ will learn with dynamic routing ( https://nextjs.org/docs/routing/dynamic-routes )

- Statically generate pages with dynamic routes using getStaticPaths.
- Write getStaticProps to fetch the data for each blog post.
- Render markdown using remark.
- Pretty-print date strings.

### Page paths that depend on external data

Each page path depends on external data. Next.js allows you to statically generate pages with paths that depend on external data. This enables dynamic URLs in Next.js.

### How to Statically Generate Pages with Dynamic Routes

In our case, we want to create dynamic routes for blog posts:

- We want each post to have the path /posts/<id>, where <id> is the name of the markdown file under the top-level posts directory.
- Since we have ssg-ssr.md and pre-rendering.md, we’d like the paths to be /posts/ssg-ssr and /posts/pre-rendering.

### Overview of the Steps

We can do this by taking the following steps. You don’t have to make these changes yet — we’ll do it all on the next page.

First, we’ll create a page called [id].js under pages/posts. Pages that begin with [ and end with ] are dynamic routes in Next.js.

In pages/posts/[id].js, we’ll write code that will render a post page — just like other pages we’ve created.

```
import Layout from '../../components/layout';

export default function Post() {
  return <Layout>...</Layout>;
}
```

Now, here’s what’s new: We’ll export an async function called getStaticPaths from this page. In this function, we need to return a list of possible values for id.

```
import Layout from '../../components/layout';

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}
```

Finally, we need to implement getStaticProps again - this time, to fetch necessary data for the blog post with a given id. getStaticProps is given params, which contains id (because the file name is [id].js).

```
import Layout from '../../components/layout';

export default function Post() {
  return <Layout>...</Layout>;
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
}
```

### Summary

So...

- Create a page in page directory/ relevant path with title [id].js
- In the file create a react component to be able to render it
- use getStaticPaths() to return the array of possible values for the id
- use getStaticProps to fetch the necessary data to populate each instance of rendering a dynamic path with relevant data

### Tidying up Posts Page

Polishing the Post Page
Adding title to the Post Page
In pages/posts/[id].js, let’s add the title tag using the post data. You'll need to add an import for next/head at the top of the file and add the title tag by updating the Post component:

```
// Add this import
import Head from 'next/head';

export default function Post({ postData }) {
  return (
    <Layout>
      {/* Add this <Head> tag */}
      <Head>
        <title>{postData.title}</title>
      </Head>

      {/* Keep the existing code here */}
    </Layout>
  );
}
```

## Formatting the Date
To format the date, we’ll use the date-fns library. First, install it:

```
npm install date-fns
```

Next, create a file called components/date.js and add the following Date component:

```
import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}
```

Note: You can view the different format() string options on the date-fns website.

Now, open pages/posts/[id].js, add an import for the Date component at the top of the file, and use it over {postData.date}:

```
// Add this import
import Date from '../../components/date';

export default function Post({ postData }) {
  return (
    <Layout>
      {/* Keep the existing code here */}

      {/* Replace {postData.date} with this */}
      <Date dateString={postData.date} />

      {/* Keep the existing code here */}
    </Layout>
  );
}
```

If you access http://localhost:3000/posts/pre-rendering, you should now see the date written as “January 1, 2020”.

## Adding CSS

Finally, let’s add some CSS using the file styles/utils.module.css we added before. Open pages/posts/[id].js, then add an import for the CSS file, and replace the Post component with the following code:

```
// Add this import at the top of the file
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
```
