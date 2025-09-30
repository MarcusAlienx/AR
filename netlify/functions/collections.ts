import 'dotenv/config';
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { storage } from "../../server/storage";
import { insertCollectionSchema } from "../../shared/schema";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const path = event.path.replace(/^\/\.netlify\/functions/, '').replace(/^\/api/, '');
  const segments = path.split('/').filter(Boolean);

  // Assumes the function is named 'collections' and handles all routes under /api/collections
  if (segments[0] !== 'collections') {
    return { statusCode: 404, body: "Not Found" };
  }

  const subpath = segments.slice(1);

  // Handle GET requests
  if (event.httpMethod === "GET") {
    try {
      // GET /api/collections
      if (subpath.length === 0) {
        const collections = await storage.getCollections();
        return { statusCode: 200, body: JSON.stringify(collections) };
      }
      // GET /api/collections/featured
      if (subpath.length === 1 && subpath[0] === 'featured') {
        const collections = await storage.getFeaturedCollections();
        return { statusCode: 200, body: JSON.stringify(collections) };
      }
      // GET /api/collections/slug/:slug
      if (subpath.length === 2 && subpath[0] === 'slug') {
        const collection = await storage.getCollectionBySlug(subpath[1]);
        if (!collection) return { statusCode: 404, body: "Collection not found" };
        return { statusCode: 200, body: JSON.stringify(collection) };
      }
      // GET /api/collections/:id
      if (subpath.length === 1) {
        const collection = await storage.getCollection(subpath[0]);
        if (!collection) return { statusCode: 404, body: "Collection not found" };
        return { statusCode: 200, body: JSON.stringify(collection) };
      }
    } catch (error) {
      console.error("Error fetching collection(s):", error);
      return { statusCode: 500, body: JSON.stringify({ error: "Failed to fetch data" }) };
    }
  }

  // Handle POST requests
  if (event.httpMethod === "POST") {
    // POST /api/collections
    if (subpath.length === 0) {
      try {
        const data = JSON.parse(event.body || "{}");
        const validatedData = insertCollectionSchema.parse(data);
        const collection = await storage.createCollection(validatedData);
        return { statusCode: 201, body: JSON.stringify(collection) };
      } catch (error) {
        console.error("Error creating collection:", error);
        return { statusCode: 400, body: JSON.stringify({ error: "Invalid collection data" }) };
      }
    }
  }

  // Handle DELETE requests
  if (event.httpMethod === "DELETE") {
    // DELETE /api/collections/:id
    if (subpath.length === 1) {
      try {
        await storage.deleteCollection(subpath[0]);
        return { statusCode: 204, body: "" };
      } catch (error) {
        console.error("Error deleting collection:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Failed to delete collection" }) };
      }
    }
  }

  return { statusCode: 404, body: "Route not found" };
};

export { handler };