import * as fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const archiveDirectory = path.join(process.cwd(), "archive");

export function getSortedArchiveData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(archiveDirectory);
  const allArchiveData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(archiveDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allArchiveData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**Function to create array of objects for generating dynamic routes.
 * Based on ids created from title of md files (e.g. blog titles) */
export function getAllArchiveIds() {
  const fileNames = fs.readdirSync(archiveDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

/**Important: The returned list is not just an array of strings — it must be an array of objects that look like the comment above.
 * Each object must have the params key and contain an object with the id key (because we’re using [id] in the file name). Otherwise, getStaticPaths will fail.
 */

/**We need to fetch necessary data to render the post with the given id.
 * getPostData will return the post data based on ID
 */

export async function getArchiveData(id) {
  const fullPath = path.join(archiveDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

/**Important: We added the async keyword to getPostData because we need to use await for remark. async/await allow you to fetch data asynchronously. */
