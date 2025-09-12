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
  type InsertContact
} from "@shared/schema";
import { randomUUID } from "crypto";
import { getImagesFromFolder, type CloudinaryImage } from "./cloudinary";

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
  updateCollection(id: string, collection: Partial<InsertCollection>): Promise<Collection | undefined>;
  
  // Project methods
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectsByCollection(collectionId: string): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  
  // Biography methods
  getBiography(): Promise<Biography | undefined>;
  updateBiography(biography: InsertBiography): Promise<Biography>;
  
  // News methods
  getNews(): Promise<News[]>;
  getPublishedNews(): Promise<News[]>;
  getNewsItem(id: string): Promise<News | undefined>;
  getNewsBySlug(slug: string): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;
  updateNews(id: string, news: Partial<InsertNews>): Promise<News | undefined>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;

  // Gallery methods
  getGalleryImages(folderName: string): Promise<any[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private collections: Map<string, Collection>;
  private projects: Map<string, Project>;
  private biography: Biography | undefined;
  private news: Map<string, News>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.collections = new Map();
    this.projects = new Map();
    this.news = new Map();
    this.contacts = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample collections
    const sampleCollections: Collection[] = [
      {
        id: '1',
        title: 'ALTA COSTURA',
        subtitle: 'COLECCIÓN PRIMAVERA 2025',
        description: 'Nuestra colección más exclusiva de alta costura',
        slug: 'alta-costura-2025',
        season: 'Primavera',
        year: '2025',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1594736797933-d0c02e8ec2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000'
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'VESTIDOS DE NOVIA',
        subtitle: 'COLECCIÓN ETERNA',
        description: 'Vestidos únicos para el día más especial',
        slug: 'vestidos-novia-eterna',
        season: 'Atemporal',
        year: '2025',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000'
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    sampleCollections.forEach(collection => {
      this.collections.set(collection.id, collection);
    });

    // Sample biography
    this.biography = {
      id: '1',
      content: 'Alberto Rodríguez es un reconocido diseñador mexicano de alta costura con más de 35 años de experiencia.',
      philosophy: 'En la moda hay que evolucionar más allá de las tendencias y estilos',
      experience: 'Más de 35 años creando momentos únicos',
      achievements: [
        'Participación en Mercedes-Benz Fashion Week México',
        'Colaboración con Swarovski Company',
        'Vestidos para celebridades nacionales e internacionales'
      ],
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600'
      ],
      updatedAt: new Date(),
    };

    // Sample news
    const sampleNews: News[] = [
      {
        id: '1',
        title: 'Nueva Colección Primavera 2025',
        excerpt: 'Descubre nuestra nueva colección inspirada en la elegancia atemporal',
        content: 'Nuestra nueva colección combina técnicas tradicionales con diseños contemporáneos...',
        slug: 'nueva-coleccion-primavera-2025',
        category: 'Colecciones',
        featuredImage: 'https://images.unsplash.com/photo-1594736797933-d0c02e8ec2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        published: true,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    sampleNews.forEach(newsItem => {
      this.news.set(newsItem.id, newsItem);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Collection methods
  async getCollections(): Promise<Collection[]> {
    return Array.from(this.collections.values());
  }

  async getFeaturedCollections(): Promise<Collection[]> {
    return Array.from(this.collections.values()).filter(c => c.featured);
  }

  async getCollection(id: string): Promise<Collection | undefined> {
    return this.collections.get(id);
  }

  async getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    return Array.from(this.collections.values()).find(c => c.slug === slug);
  }

  async createCollection(insertCollection: InsertCollection): Promise<Collection> {
    const id = randomUUID();
    const collection: Collection = {
      ...insertCollection,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.collections.set(id, collection);
    return collection;
  }

  async updateCollection(id: string, updates: Partial<InsertCollection>): Promise<Collection | undefined> {
    const collection = this.collections.get(id);
    if (!collection) return undefined;
    
    const updatedCollection: Collection = {
      ...collection,
      ...updates,
      updatedAt: new Date(),
    };
    this.collections.set(id, updatedCollection);
    return updatedCollection;
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(p => p.featured);
  }

  async getProjectsByCollection(collectionId: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(p => p.collectionId === collectionId);
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      ...insertProject,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject: Project = {
      ...project,
      ...updates,
      updatedAt: new Date(),
    };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  // Biography methods
  async getBiography(): Promise<Biography | undefined> {
    return this.biography;
  }

  async updateBiography(insertBiography: InsertBiography): Promise<Biography> {
    const id = this.biography?.id || randomUUID();
    this.biography = {
      ...insertBiography,
      id,
      updatedAt: new Date(),
    };
    return this.biography;
  }

  // News methods
  async getNews(): Promise<News[]> {
    return Array.from(this.news.values());
  }

  async getPublishedNews(): Promise<News[]> {
    return Array.from(this.news.values()).filter(n => n.published);
  }

  async getNewsItem(id: string): Promise<News | undefined> {
    return this.news.get(id);
  }

  async getNewsBySlug(slug: string): Promise<News | undefined> {
    return Array.from(this.news.values()).find(n => n.slug === slug);
  }

  async createNews(insertNews: InsertNews): Promise<News> {
    const id = randomUUID();
    const newsItem: News = {
      ...insertNews,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.news.set(id, newsItem);
    return newsItem;
  }

  async updateNews(id: string, updates: Partial<InsertNews>): Promise<News | undefined> {
    const newsItem = this.news.get(id);
    if (!newsItem) return undefined;
    
    const updatedNews: News = {
      ...newsItem,
      ...updates,
      updatedAt: new Date(),
    };
    this.news.set(id, updatedNews);
    return updatedNews;
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  // Gallery methods
  async getGalleryImages(folderName: string): Promise<CloudinaryImage[]> {
    return getImagesFromFolder(folderName);
  }
}

export const storage = new MemStorage();
