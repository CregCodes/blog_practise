/**The default export of _app.js is a top-level React component that wraps all the pages in your application. You can use this component to keep state when navigating between pages, or to add global styles */

import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

/**In Next.js, you can add global CSS files by importing them from pages/_app.js. You cannot import global CSS anywhere else.

The reason that global CSS can't be imported outside of pages/_app.js is that global CSS affects all elements on the page. */
