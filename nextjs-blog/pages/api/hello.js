/**API Routes let you create an API endpoint inside a Next.js app. */

export default function handler(req, res) {
  res.status(200).json({ text: "hello" });
}

/** Access endpoint like other pages by navigating to /api/hello
 * req is an instance of http.IncomingMessage, plus some pre-built middlewares.
 * res is an instance of http.ServerResponse, plus some helper functions.
 */
