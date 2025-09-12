import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCollectionSchema,
  insertProjectSchema,
  insertBiographySchema,
  insertNewsSchema,
  insertContactSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Collections routes
  app.get("/api/collections", async (_req, res) => {
    try {
      const collections = await storage.getCollections();
      res.json(collections);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch collections" });
    }
  });

  app.get("/api/collections/featured", async (_req, res) => {
    try {
      const collections = await storage.getFeaturedCollections();
      res.json(collections);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured collections" });
    }
  });

  app.get("/api/collections/:id", async (req, res) => {
    try {
      const collection = await storage.getCollection(req.params.id);
      if (!collection) {
        return res.status(404).json({ error: "Collection not found" });
      }
      res.json(collection);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch collection" });
    }
  });

  app.get("/api/collections/slug/:slug", async (req, res) => {
    try {
      const collection = await storage.getCollectionBySlug(req.params.slug);
      if (!collection) {
        return res.status(404).json({ error: "Collection not found" });
      }
      res.json(collection);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch collection" });
    }
  });

  app.post("/api/collections", async (req, res) => {
    try {
      const validatedData = insertCollectionSchema.parse(req.body);
      const collection = await storage.createCollection(validatedData);
      res.status(201).json(collection);
    } catch (error) {
      res.status(400).json({ error: "Invalid collection data" });
    }
  });

  // Gallery routes
  app.get("/api/gallery/*", async (req, res) => {
    try {
      // req.params[0] will capture everything after /api/gallery/
      const folderName = req.params[0];
      if (!folderName) {
        return res.status(400).json({ error: "Folder name is required" });
      }
      const images = await storage.getGalleryImages(folderName);
      res.json(images);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: "Failed to fetch gallery images", details: err.message });
    }
  });

  // Projects routes
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/featured", async (_req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured projects" });
    }
  });

  app.get("/api/projects/collection/:collectionId", async (req, res) => {
    try {
      const projects = await storage.getProjectsByCollection(req.params.collectionId);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects for collection" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  // Biography routes
  app.get("/api/biography", async (_req, res) => {
    try {
      const biography = await storage.getBiography();
      if (!biography) {
        return res.status(404).json({ error: "Biography not found" });
      }
      res.json(biography);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch biography" });
    }
  });

  app.put("/api/biography", async (req, res) => {
    try {
      const validatedData = insertBiographySchema.parse(req.body);
      const biography = await storage.updateBiography(validatedData);
      res.json(biography);
    } catch (error) {
      res.status(400).json({ error: "Invalid biography data" });
    }
  });

  // News routes
  app.get("/api/news", async (_req, res) => {
    try {
      const news = await storage.getNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.get("/api/news/published", async (_req, res) => {
    try {
      const news = await storage.getPublishedNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch published news" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const newsItem = await storage.getNewsItem(req.params.id);
      if (!newsItem) {
        return res.status(404).json({ error: "News item not found" });
      }
      res.json(newsItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news item" });
    }
  });

  app.get("/api/news/slug/:slug", async (req, res) => {
    try {
      const newsItem = await storage.getNewsBySlug(req.params.slug);
      if (!newsItem) {
        return res.status(404).json({ error: "News item not found" });
      }
      res.json(newsItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news item" });
    }
  });

  app.post("/api/news", async (req, res) => {
    try {
      const validatedData = insertNewsSchema.parse(req.body);
      const newsItem = await storage.createNews(validatedData);
      res.status(201).json(newsItem);
    } catch (error) {
      res.status(400).json({ error: "Invalid news data" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ 
        message: "Solicitud de contacto enviada exitosamente", 
        contact 
      });
    } catch (error) {
      res.status(400).json({ error: "Datos de contacto inválidos" });
    }
  });

  app.get("/api/contacts", async (_req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
