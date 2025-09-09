# Alberto Rodríguez Couture - Website

## Overview

This is a sophisticated, high-end luxury fashion website for Alberto Rodríguez Couture, a prestigious haute couture house founded in 1986 and based in Guadalajara, Mexico. The application features premium visual elements, responsive hamburger navigation, and video hero sections that replicate the luxury aesthetics of Louis Vuitton and Zuhair Murad. The site showcases collections, provides company information, and handles customer inquiries for custom wedding dresses and formal wear.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Updates (January 2025)

### Cloudinary + react-photo-view Integration (COMPLETED)
- **✅ Phase 1**: Infrastructure setup with Cloudinary configuration and react-photo-view integration
- **✅ Phase 2**: Data structure implementation with gallery arrays for collections and Red Carpet events  
- **✅ Phase 3**: Interactive gallery components with enhanced CollectionCard and ServiceCard
- **✅ Phase A**: Advanced optimizations with filters, lazy loading, and SEO enhancements
- **✅ Phase B**: Real Cloudinary configuration guide with automated setup script
- **✅ Phase C**: Performance optimizations and advanced features

### Gallery System Features
- **Premium Photo Galleries**: 49 organized images across collections, Red Carpet events, and services
- **Interactive Components**: Enhanced CollectionCard and ServiceCard with gallery overlays and animations
- **Advanced Lightbox**: react-photo-view integration with luxury theme and custom controls
- **Category Filtering**: Smart filters by image type (detail, process, event, model, inspiration)
- **Lazy Loading**: Optimized image loading with intersection observer and quality adjustments
- **SEO Integration**: Structured data, Open Graph, and Twitter Cards for all galleries

### Previous Updates
- **Enhanced Hamburger Menu**: Implemented premium animated hamburger navigation with slide-out sidebar, contact information, and social links
- **Video Hero Component**: Created immersive video hero section with custom controls and elegant overlays
- **Visual Effects**: Added sophisticated animations, scroll effects, and micro-interactions throughout
- **Collections Reorganization**: Updated collections order to NOVIA, XV, NOCHE, CORTOS, PRIMAVERA, ALQUILER with complete navigation update
- **Red Carpet Section Update**: Restructured to focus on CELEBRITIES, CLIENTAS, FASHION WEEK, DESFILES categories
- **Navigation System Overhaul**: Updated all menus, footer links, and hash routing to match new collection structure
- **Smart Navigation**: Fixed collection links to navigate directly to specific sections with new category IDs
- **Navigation Scroll Fix**: Implemented automatic scroll to top on route changes with useEffect hook
- **Logo Centered**: Removed search icon and perfectly centered logo with proper spacing
- **Footer Links**: Corrected empresa section to use proper /about and /contact routes
- **Strapi CMS Migration Plan**: Comprehensive 6-phase strategy for migrating all content to Strapi headless CMS
- **Comprehensive Documentation**: Complete README.md with deployment instructions, CMS integration guide, and project architecture
- **Netlify Ready**: Full deployment configuration with manifest.json, _redirects, and optimized build settings
- **VSCode Setup**: Complete local development environment with debug configuration, extensions, and snippets
- **Local Development**: Automated setup script and comprehensive VSCode integration
- **GitHub Preparation**: Project structured for version control with proper .gitignore and documentation
- **GitIgnore Optimization**: Consolidated and optimized .gitignore for Netlify, VSCode, and GitHub with security best practices

## System Architecture

### Frontend Architecture
The client-side is built with **React 18** and **Vite** for fast development and building. The application uses:

- **Wouter** for lightweight client-side routing instead of React Router
- **Tailwind CSS** with custom luxury color scheme and typography variables
- **Framer Motion** for smooth animations and page transitions
- **shadcn/ui** component library with Radix UI primitives for accessible, high-quality components
- **TanStack Query (React Query)** for efficient data fetching and caching

The frontend follows a component-based architecture with:
- Page components for main routes (Home, Collections, About, Contact)
- Reusable UI components (CollectionCard, HeroSection, ServiceCard)
- Layout components (Header, Footer)
- A centralized styling system using CSS custom properties

### Backend Architecture
The server is built with **Express.js** and follows a RESTful API pattern:

- **TypeScript** throughout for type safety
- API routes organized in a separate routes module
- Storage abstraction layer with interfaces for data operations
- In-memory mock storage implementation for development
- Middleware for request logging and error handling

### Database Design
The application uses **Drizzle ORM** with PostgreSQL schema including:

- **Collections** table for fashion collections with metadata, images, and seasonal information
- **Projects** table for individual pieces linked to collections
- **Biography** table for company/designer information
- **Users** table for authentication
- **News** and **Contact** tables for content management

Tables include proper relationships, timestamps, and JSON fields for flexible data like image arrays and tags.

### UI/UX Architecture
The design system emphasizes luxury and minimalism:

- Custom color palette with luxury gold (#D4AF37) as the primary accent
- Typography hierarchy using Playfair Display (serif) and Inter (sans-serif)
- Responsive design optimized for both desktop and mobile experiences
- Smooth animations and hover effects for enhanced user experience
- Full-screen hero sections with immersive imagery

### Development Environment
The project is configured for modern development practices:

- **ESM modules** throughout the application
- **Vite** for fast hot module replacement during development
- **TypeScript** strict mode for enhanced code quality
- **Path aliases** for clean imports (@/ for client, @shared for shared types)
- **PostCSS** with Tailwind CSS and Autoprefixer

## External Dependencies

### Database
- **Neon Database** (@neondatabase/serverless) - Serverless PostgreSQL hosting
- **Drizzle ORM** - Type-safe SQL query builder and schema management
- **Drizzle Kit** - Database migration and schema management tools

### UI Libraries
- **shadcn/ui components** - Complete set of accessible UI primitives built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework with custom design tokens
- **Framer Motion** - Animation library for smooth transitions and interactions
- **Lucide React** - Icon library for consistent iconography

### Development Tools
- **Vite** - Fast build tool and development server
- **TypeScript** - Static type checking and enhanced developer experience
- **ESBuild** - Fast JavaScript bundler for production builds

### Routing and State Management
- **Wouter** - Lightweight routing library for React
- **TanStack Query** - Data fetching, caching, and synchronization
- **React Hook Form** with Zod validation - Form handling and validation

### Styling and Theming
- **Tailwind CSS** with custom configuration for luxury brand styling
- **CSS custom properties** for consistent theming
- **Google Fonts** integration for typography (Playfair Display, Inter)

The application is designed to be deployed on platforms like Netlify or Vercel, with the database hosted on Neon for scalability and performance.

## Content Management Strategy

### Current State
The application currently uses hardcoded content arrays for:
- **Collections**: 6 collections across NOVIA, XV, NOCHE, CORTOS, PRIMAVERA, ALQUILER categories
- **Red Carpet Events**: CELEBRITIES, CLIENTAS, FASHION WEEK, DESFILES showcase
- **Services**: 3 premium services with custom descriptions
- **Company Information**: Milestones, values, and corporate content
- **Navigation**: Dynamic menu items and categorization

### Strapi CMS Migration Plan
A comprehensive 6-phase migration strategy has been developed:

**Phase 1**: Infrastructure setup with Strapi deployment and API configuration
**Phase 2**: Core collections management with category and collection models
**Phase 3**: Red Carpet events and services content types
**Phase 4**: Corporate content including milestones and company values
**Phase 5**: Navigation and global site settings
**Phase 6**: Optimization with caching, SEO automation, and advanced features

### Benefits of CMS Integration
- **Dynamic Content Management**: Visual editor for all content updates
- **Performance Optimization**: Intelligent caching and image optimization
- **SEO Enhancement**: Automated meta tags and structured data
- **Scalability**: Easy addition of new collections and content types
- **Multi-language Readiness**: Prepared for international expansion
- **Version Control**: Content versioning and rollback capabilities