# GEMINI.md

## Project Overview

This is a high-end web application for the haute couture house Alberto Rodríguez. The project is a full-stack, TypeScript-based application with a React frontend and an Express.js backend. It uses a Jamstack architecture, with the frontend being a Single Page Application (SPA) and the backend powered by serverless Netlify Functions in production.

The application features a sophisticated design, responsive navigation, and immersive video elements. It's built with a focus on performance, SEO, and a premium user experience.

**Key Technologies:**

*   **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Wouter, shadcn/ui, Radix UI, TanStack Query
*   **Backend:** Express.js, TypeScript, Drizzle ORM, Neon Database (PostgreSQL), Netlify Functions
*   **Database:** PostgreSQL (via Neon)
*   **DevOps:** Netlify, GitHub Actions, Vitest, ESLint

## Building and Running

### Prerequisites

*   Node.js 18+
*   npm
*   A PostgreSQL database (Neon is recommended)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    *   Copy the `.env.example` file to a new file named `.env`.
    *   Edit the `.env` file with your database credentials and other required settings.
    ```env
    DATABASE_URL="postgresql://user:password@host/database"
    NODE_ENV="development"
    ```

### Running the Project

*   **Development:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server for the frontend and the Express.js server for the backend. The application will be available at `http://localhost:5000`.

*   **Production:**
    ```bash
    npm run build
    npm run start
    ```
    This will build the frontend and backend for production and start the production server.

### Testing

*   **Run all tests:**
    ```bash
    npm test
    ```
*   **Run tests with UI:**
    ```bash
    npm run test:ui
    ```

## Development Conventions

*   **TypeScript:** The entire project is written in TypeScript, including the frontend, backend, and shared code.
*   **Shared Schemas:** The `shared/schema.ts` file contains Drizzle schemas and Zod validation schemas that are used by both the frontend and backend. This ensures data consistency across the application.
*   **Linting:** The project uses ESLint to enforce code quality and consistency. Run `npm run lint` to check for linting errors.
*   **Testing:** The project uses Vitest and React Testing Library for unit and integration testing.
*   **CI/CD:** GitHub Actions are used to automate the deployment process to Netlify. The workflow includes steps for linting, testing, and building the application.
*   **Pre-commit Hooks:** The project uses husky and lint-staged to run linting and other checks before committing code.
