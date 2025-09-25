# Resumen Técnico del Proyecto

Este documento proporciona una descripción general de la arquitectura y las tecnologías utilizadas en el proyecto Alberto Rodríguez Couture.

## 1. Arquitectura General: Jamstack Híbrida

El proyecto sigue una arquitectura **Jamstack Híbrida y Tipada**, diseñada para ofrecer alto rendimiento, escalabilidad y una excelente experiencia de desarrollo.

-   **Frontend:** Una **Single Page Application (SPA)** construida con **React** y **Vite**. Se encarga de toda la interfaz de usuario y la experiencia interactiva.
-   **Backend (Producción):** Un conjunto de **Funciones Serverless de Netlify** que exponen una API REST. Este enfoque permite una escalabilidad automática y eficiente.
-   **Backend (Desarrollo):** Un servidor **Express.js** que replica la API de las funciones de Netlify, facilitando el desarrollo y las pruebas en un entorno local.
-   **Base de Datos:** Una base de datos **PostgreSQL** (alojada en NeonDB) con la que se interactúa a través del ORM **Drizzle**, garantizando consultas seguras y tipadas.
-   **Tipado End-to-End:** **TypeScript** se utiliza en todo el stack (frontend, backend, y un directorio `shared/` para esquemas comunes), lo que proporciona una gran robustez y reduce errores en tiempo de ejecución.

## 2. Stack Tecnológico

### Frontend
-   **Framework:** React 18
-   **Build Tool:** Vite
-   **Lenguaje:** TypeScript
-   **UI Components:** shadcn/ui, Radix UI
-   **Estilos:** Tailwind CSS
-   **Gestión de Estado del Servidor:** TanStack Query (React Query)
-   **Enrutamiento:** Wouter
-   **Formularios:** React Hook Form con Zod para validación.

### Backend
-   **Entorno de Ejecución (Producción):** Netlify Functions
-   **Entorno de Ejecución (Desarrollo):** Node.js con Express.js
-   **Lenguaje:** TypeScript
-   **ORM:** Drizzle
-   **Base de Datos:** PostgreSQL (Neon)
-   **Autenticación:** Passport.js (configuración base)

### DevOps y Calidad de Código
-   **Hosting:** Netlify
-   **CI/CD:** GitHub Actions
-   **Testing:** Vitest y React Testing Library
-   **Linting:** ESLint
-   **Gestión de Paquetes:** npm

## 3. Flujo de Datos y Lógica Clave

-   **Esquemas Compartidos:** El directorio `shared/schema.ts` contiene las definiciones de Drizzle y los esquemas de validación de Zod. Esto asegura que el frontend y el backend "hablen" el mismo idioma.
-   **API Gateway:** En producción, Netlify redirige todas las peticiones de `/api/*` a las funciones serverless correspondientes (`/.netlify/functions/*`), actuando como un gateway de API.
-   **Gestión de Assets:** Las imágenes y otros medios son gestionados y servidos a través de **Cloudinary** para una entrega optimizada y global.
