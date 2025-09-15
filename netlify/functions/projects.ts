import 'dotenv/config';
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { storage } from "../../server/storage";
import { insertProjectSchema } from "../../shared/schema";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const path = event.path.replace(/^\/\.netlify\/functions/, '').replace(/^\/api/, '');
  const segments = path.split('/').filter(Boolean);

  if (segments[0] !== 'projects') {
    return { statusCode: 404, body: "Not Found" };
  }

  const subpath = segments.slice(1);

  // Handle GET requests
  if (event.httpMethod === "GET") {
    try {
      // GET /api/projects
      if (subpath.length === 0) {
        const projects = await storage.getProjects();
        return { statusCode: 200, body: JSON.stringify(projects) };
      }
      // GET /api/projects/featured
      if (subpath.length === 1 && subpath[0] === 'featured') {
        const projects = await storage.getFeaturedProjects();
        return { statusCode: 200, body: JSON.stringify(projects) };
      }
      // GET /api/projects/collection/:collectionId
      if (subpath.length === 2 && subpath[0] === 'collection') {
        const projects = await storage.getProjectsByCollection(subpath[1]);
        return { statusCode: 200, body: JSON.stringify(projects) };
      }
      // GET /api/projects/:id
      if (subpath.length === 1) {
        const project = await storage.getProject(subpath[0]);
        if (!project) return { statusCode: 404, body: "Project not found" };
        return { statusCode: 200, body: JSON.stringify(project) };
      }
    } catch (error) {
      console.error("Error fetching project(s):", error);
      return { statusCode: 500, body: JSON.stringify({ error: "Failed to fetch data" }) };
    }
  }

  // Handle POST requests
  if (event.httpMethod === "POST") {
    // POST /api/projects
    if (subpath.length === 0) {
      try {
        const data = JSON.parse(event.body || "{}");
        const validatedData = insertProjectSchema.parse(data);
        const project = await storage.createProject(validatedData);
        return { statusCode: 201, body: JSON.stringify(project) };
      } catch (error) {
        console.error("Error creating project:", error);
        return { statusCode: 400, body: JSON.stringify({ error: "Invalid project data" }) };
      }
    }
  }

  return { statusCode: 404, body: "Route not found" };
};

export { handler };
