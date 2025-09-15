import 'dotenv/config';
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { storage } from "../../server/storage";
import { insertNewsSchema } from "../../shared/schema";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const path = event.path.replace(/^\/\.netlify\/functions/, '').replace(/^\/api/, '');
  const segments = path.split('/').filter(Boolean);

  if (segments[0] !== 'news') {
    return { statusCode: 404, body: "Not Found" };
  }

  const subpath = segments.slice(1);

  // Handle GET requests
  if (event.httpMethod === "GET") {
    try {
      // GET /api/news
      if (subpath.length === 0) {
        const news = await storage.getNews();
        return { statusCode: 200, body: JSON.stringify(news) };
      }
      // GET /api/news/published
      if (subpath.length === 1 && subpath[0] === 'published') {
        const news = await storage.getPublishedNews();
        return { statusCode: 200, body: JSON.stringify(news) };
      }
      // GET /api/news/slug/:slug
      if (subpath.length === 2 && subpath[0] === 'slug') {
        const newsItem = await storage.getNewsBySlug(subpath[1]);
        if (!newsItem) return { statusCode: 404, body: "News item not found" };
        return { statusCode: 200, body: JSON.stringify(newsItem) };
      }
      // GET /api/news/:id
      if (subpath.length === 1) {
        const newsItem = await storage.getNewsItem(subpath[0]);
        if (!newsItem) return { statusCode: 404, body: "News item not found" };
        return { statusCode: 200, body: JSON.stringify(newsItem) };
      }
    } catch (error) {
      console.error("Error fetching news item(s):", error);
      return { statusCode: 500, body: JSON.stringify({ error: "Failed to fetch data" }) };
    }
  }

  // Handle POST requests
  if (event.httpMethod === "POST") {
    // POST /api/news
    if (subpath.length === 0) {
      try {
        const data = JSON.parse(event.body || "{}");
        const validatedData = insertNewsSchema.parse(data);
        const newsItem = await storage.createNews(validatedData);
        return { statusCode: 201, body: JSON.stringify(newsItem) };
      } catch (error) {
        console.error("Error creating news item:", error);
        return { statusCode: 400, body: JSON.stringify({ error: "Invalid news data" }) };
      }
    }
  }

  return { statusCode: 404, body: "Route not found" };
};

export { handler };
