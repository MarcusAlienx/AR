import { eq, desc } from "drizzle-orm";
import { 
  type User,
  type InsertUser,
  type Collection,
  type InsertCollection,
  type Project,
  type InsertProject,
  type Biography,
  type InsertBiography,
  type News,
  type InsertNews,
  type Contact,
  type InsertContact,
  collections as collectionsTable
} from "@shared/schema";
import { getImagesFromFolder, type CloudinaryImage } from "./cloudinary";
import { db } from "./db";

// The IStorage interface defines the contract for our data layer.
// It can be implemented by in-memory storage, a database, or any other backend.
export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Collection methods
  getCollections(): Promise<Collection[]>;
  getFeaturedCollections(): Promise<Collection[]>;
  getCollection(id: string): Promise<Collection | undefined>;
  getCollectionBySlug(slug: string): Promise<Collection | undefined>;
  createCollection(collection: InsertCollection): Promise<Collection>;
  
  // Project methods
  getProjects(): Promise<Project[]>;
  
  // Biography methods
  getBiography(): Promise<Biography | undefined>;
  
  // News methods
  getNews(): Promise<News[]>;
  getNewsItem(id: string): Promise<News | undefined>;
  getNewsBySlug(slug: string): Promise<News | undefined>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;

  // Gallery methods
  getGalleryImages(folderName: string): Promise<any[]>;
}

// DrizzleStorage is an implementation of IStorage that uses a Drizzle ORM client 
// to interact with a PostgreSQL database (like Neon).
export class DrizzleStorage implements IStorage {

  // --- Collection Methods ---
  async getCollections(): Promise<Collection[]> {
    return await db.select().from(collectionsTable).orderBy(desc(collectionsTable.createdAt));
  }

  async getFeaturedCollections(): Promise<Collection[]> {
    return await db.select().from(collectionsTable).where(eq(collectionsTable.featured, true)).orderBy(desc(collectionsTable.createdAt));
  }

  async getCollection(id: string): Promise<Collection | undefined> {
    const results = await db.select().from(collectionsTable).where(eq(collectionsTable.id, id));
    return results[0];
  }

  async getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    const results = await db.select().from(collectionsTable).where(eq(collectionsTable.slug, slug));
    return results[0];
  }

  async createCollection(collection: InsertCollection): Promise<Collection> {
    const results = await db.insert(collectionsTable).values(collection).returning();
    return results[0];
  }

  // --- Gallery Methods ---
  async getGalleryImages(folderName: string): Promise<CloudinaryImage[]> {
    // This method directly interacts with the Cloudinary helper
    return getImagesFromFolder(folderName);
  }

  // --- Stubbed Methods (Not Implemented) ---
  // The following methods are not yet implemented with Drizzle and will throw an error.
  // This is to focus on the primary goal of fixing the gallery display.

  async getUser(id: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  async getUserByUsername(username: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  async createUser(user: InsertUser): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async getProjects(): Promise<Project[]> {
    throw new Error("Method not implemented.");
  }
  async getBiography(): Promise<Biography | undefined> {
    throw new Error("Method not implemented.");
  }
  async getNews(): Promise<News[]> {
    throw new Error("Method not implemented.");
  }
  async getNewsItem(id: string): Promise<News | undefined> {
    throw new Error("Method not implemented.");
  }
  async getNewsBySlug(slug: string): Promise<News | undefined> {
    throw new Error("Method not implemented.");
  }
  async createContact(contact: InsertContact): Promise<Contact> {
    throw new Error("Method not implemented.");
  }
  async getContacts(): Promise<Contact[]> {
    throw new Error("Method not implemented.");
  }
}

// By exporting an instance of DrizzleStorage, the entire application will now use the database.
export const storage = new DrizzleStorage();