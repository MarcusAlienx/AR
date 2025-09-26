# Alberto Rodríguez Couture

Una aplicación web de alta gama para la casa de haute couture Alberto Rodríguez, especializada en vestidos de novia y de gala con más de 35 años de experiencia en Guadalajara, México.

## 🎯 Descripción del Proyecto

Este sitio web replica la estética de lujo de marcas como Louis Vuitton y Zuhair Murad, ofreciendo una experiencia premium para mostrar las colecciones de alta costura de Alberto Rodríguez. La aplicación presenta un diseño sofisticado, navegación responsiva con menú hamburguesa, elementos visuales premium y tipografía Stevens Titling para el branding.

### Características Principales

- ✨ **Diseño de Lujo**: Estética premium inspirada en Louis Vuitton y Zuhair Murad
- 📱 **Responsivo**: Navegación hamburguesa elegante para móviles
- 🎥 **Video Hero**: Secciones inmersivas con controles personalizados
- 🎨 **Animaciones**: Efectos suaves con Framer Motion
- 🔗 **Navegación Inteligente**: Enlaces directos a secciones específicas de colecciones
- 🌟 **SEO Optimizado**: Meta tags y Open Graph implementados
- 🚀 **Listo para Netlify**: Configuración completa de despliegue

## 🏗️ Arquitectura del Proyecto

### Frontend

- **React 18** con **Vite** para desarrollo rápido
- **TypeScript** para seguridad de tipos
- **Tailwind CSS** con sistema de colores de lujo personalizado
- **Framer Motion** para animaciones suaves
- **Wouter** para enrutamiento ligero
- **shadcn/ui** + **Radix UI** para componentes accesibles
- **TanStack Query** para gestión de estado y caché

### Backend

- **Express.js** con TypeScript
- **Drizzle ORM** para gestión de base de datos
- **Neon Database** (PostgreSQL serverless)
- Arquitectura RESTful con rutas organizadas
- Middleware para logging y manejo de errores

### Base de Datos

```sql
-- Esquema principal
Collections (id, name, description, category, images, seasonal_info)
Projects (id, collection_id, title, description, images, tags)
Biography (id, content, achievements, timeline)
Users (id, email, password_hash, role)
News (id, title, content, published_at)
Contact (id, name, email, message, created_at)
```

## 🎨 Sistema de Diseño

### Paleta de Colores

- **Oro Luxury**: `#D4AF37` - Color principal de acento
- **Negro Luxury**: `#1a1a1a` - Texto principal
- **Gris Suave**: `#f8f8f8` - Fondos neutros
- **Blanco Premium**: `#ffffff` - Fondos principales

### Tipografía

- **Playfair Display**: Serif para títulos elegantes
- **Inter**: Sans-serif para texto de lectura
- **Stevens Titling**: Fuente del logo (personalizada)

### Componentes Clave

- `VideoHero`: Sección hero inmersiva con video
- `CollectionCard`: Tarjetas de colección con efectos hover
- `ServiceCard`: Servicios con iconografía Lucide
- `Header`: Navegación con menú hamburguesa animado
- `Footer`: Enlaces organizados por categorías

## 📁 Estructura del Proyecto

```
AR/
├── client/                     # Frontend React/Vite
│   ├── public/                 # Archivos estáticos
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── Layout/         # Header, Footer
│   │   │   └── UI/             # VideoHero, Cards, etc.
│   │   ├── hooks/              # React hooks personalizados
│   │   ├── lib/                # Utilidades y configuración
│   │   ├── pages/              # Páginas principales
│   │   │   ├── Home.tsx        # Página de inicio
│   │   │   ├── Collections.tsx # Galería de colecciones
│   │   │   ├── About.tsx       # Historia de la empresa
│   │   │   └── Contact.tsx     # Formulario de contacto
│   │   ├── App.tsx             # Enrutador principal
│   │   ├── main.tsx            # Punto de entrada
│   │   └── index.css           # Estilos globales
├── server/                     # Backend Express
│   ├── index.ts                # Servidor principal
│   ├── routes.ts               # Rutas API
│   ├── storage.ts              # Interfaz de almacenamiento
│   └── vite.ts                 # Configuración Vite
├── shared/
│   └── schema.ts               # Esquemas TypeScript compartidos
├── components.json             # Configuración shadcn/ui
├── drizzle.config.ts          # Configuración base de datos
├── netlify.toml               # Configuración Netlify
├── package.json               # Dependencias del proyecto
└── vite.config.ts             # Configuración Vite
```

## 🚀 Desarrollo Local

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Base de datos PostgreSQL (Neon recomendado)

### Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/alberto-rodriguez-couture.git
cd alberto-rodriguez-couture
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
DATABASE_URL="postgresql://usuario:password@host/database"
NODE_ENV="development"
```

4. **Configurar base de datos**

```bash
npm run db:push
```

5. **Iniciar desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5000`

### Scripts Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Construye para producción
npm run start        # Inicia el servidor de producción
npm run check        # Verifica tipos con TypeScript
npm run db:push      # Aplica cambios de esquema a la DB
npm run test         # Ejecuta todas las pruebas (unitarias y de integración)
npm run test:ui      # Abre la interfaz gráfica de Vitest
npm run lint         # Ejecuta el linter para análisis de código
```

## 🌐 Despliegue en Netlify

### Configuración Automática

El proyecto incluye `netlify.toml` preconfigurado:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Pasos de Despliegue

1. **Conectar con GitHub**

   - Fork o clona este repositorio
   - Conecta tu cuenta de Netlify con GitHub

2. **Configurar Build**

   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

3. **Variables de Entorno**

   ```
   DATABASE_URL=tu_url_de_neon_database
   NODE_ENV=production
   RESEND_API_KEY=tu_api_key_de_resend
   ```

   **Nota:** La `RESEND_API_KEY` es necesaria para que el envío de correos desde los formularios de contacto y newsletter funcione.

4. **Desplegar**
   - Netlify detectará automáticamente los cambios
   - Build time típico: 2-3 minutos

### Características de Producción

- ✅ **SPA Routing**: Redirects configurados para Wouter
- ✅ **Asset Optimization**: Vite optimiza automáticamente
- ✅ **TypeScript**: Verificación en build time
- ✅ **SEO Ready**: Meta tags y estructura semántica
- ✅ **Performance**: Lazy loading y code splitting

## 🎯 Navegación y Funcionalidades

### Páginas Principales

1. **Home (`/`)**

   - Video hero inmersivo
   - Galería de colecciones destacadas
   - Servicios premium
   - Eventos de alfombra roja (CELEBRITIES, CLIENTAS, FASHION WEEK, DESFILES)

2. **Collections (`/collections`)**

   - Filtrado por categorías (NOVIA, XV, NOCHE, CORTOS, PRIMAVERA, ALQUILER)
   - Navegación directa con hashtags (`#novia`, `#xv`, `#noche`, etc.)
   - Estadísticas de la empresa
   - Galería responsive

3. **About (`/about`)**

   - Historia de Alberto Rodríguez
   - Filosofía de diseño
   - Timeline de logros
   - Equipo y taller

4. **Contact (`/contact`)**
   - Formulario de contacto con validación
   - Información de ubicación (Guadalajara, Jalisco)
   - Mapa interactivo
   - Horarios de atención

### Navegación Avanzada

- **Enlaces Inteligentes**: Los botones del menú navegan directamente a secciones específicas
- **Hash Routing**: URLs como `/collections#novia` filtran automáticamente
- **Scroll Suave**: Animaciones de desplazamiento elegantes
- **Menú Responsive**: Hamburguesa animada con sidebar en móviles

## 🔧 Gestión de Contenido (CMS)

### Opciones Recomendadas de Headless CMS

#### 1. **Sanity.io** (Recomendado)

```bash
npm install @sanity/client @sanity/image-url
```

**Ventajas**:

- Excelente para galerías de imágenes
- Editores visuales intuitivos
- CDN global optimizado
- Esquemas personalizables

**Integración**:

```typescript
// lib/sanity.ts
import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: "tu-project-id",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});
```

#### 2. **Strapi**

```bash
npm install @strapi/strapi @strapi/plugin-upload
```

**Ventajas**:

- Panel de administración completo
- Gestión de usuarios y roles
- API REST/GraphQL automática
- Plugins para SEO y media

#### 3. **Contentful**

```bash
npm install contentful
```

**Ventajas**:

- CDN global premium
- Previsualizaciones en tiempo real
- Workflows de publicación
- Integración con Netlify

### Plan de Migración a Strapi CMS

#### Estrategia de 6 Fases

**Fase 1: Infraestructura Strapi**

- Despliegue de instancia Strapi
- Configuración de autenticación y API tokens
- Preparación del frontend para consumir APIs

**Fase 2: Gestión de Colecciones**

- Modelos para categorías (NOVIA, XV, NOCHE, CORTOS, PRIMAVERA, ALQUILER)
- Migración de las 6 colecciones actuales
- Integración con navegación dinámica

**Fase 3: Contenido Red Carpet y Servicios**

- Eventos Red Carpet (CELEBRITIES, CLIENTAS, FASHION WEEK, DESFILES)
- Servicios premium con iconografía personalizada

**Fase 4: Contenido Corporativo**

- Historia y milestones de la empresa
- Valores corporativos
- Información de contacto

**Fase 5: Navegación Global**

- Elementos de menú dinámicos
- Configuración global del sitio
- Enlaces de footer administrables

**Fase 6: Optimización Avanzada**

- Sistema de caché inteligente
- SEO automático
- Optimización de imágenes

#### Ejemplo de Integración

```typescript
// lib/strapi.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.VITE_STRAPI_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.VITE_STRAPI_API_TOKEN}`,
  },
});

export async function getCollections() {
  const { data } = await api.get("/collections?populate=*");
  return data.data;
}

// hooks/useCollections.ts
export function useCollections() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });
}
```

## 🔒 Seguridad y Autenticación

### Sistema Actual

- Autenticación con Passport.js
- Hash de contraseñas con bcrypt
- Middleware de autorización

### Mejoras Recomendadas

- OAuth con Google/Facebook
- JWT tokens para API
- Rate limiting
- Validación de entrada con Zod

## 📊 Analytics y SEO

### SEO Implementado

- Meta tags dinámicos por página
- Open Graph para redes sociales
- Structured data (JSON-LD)
- Sitemap.xml automático
- URLs semánticas

### Analytics Recomendados

```typescript
// lib/analytics.ts
import { GoogleAnalytics } from "@next/third-parties/google";

export function setupAnalytics() {
  // Google Analytics 4
  // Meta Pixel
  // Hotjar o similar para UX
}
```

## 🧪 Testing

### Configuración Actual

El proyecto está configurado con **Vitest** para pruebas unitarias y de integración, y **React Testing Library** para componentes.

- **Pruebas Unitarias**: `*.test.ts` para lógica de negocio.
- **Pruebas de Componentes**: `*.test.tsx` para componentes de React.
- **Pruebas de Integración**: Pruebas para los endpoints de las Netlify Functions.

### Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas en la terminal
npm test

# Abrir la interfaz gráfica de Vitest
npm run test:ui
```

## 🔄 CI/CD

### GitHub Actions

El workflow en `.github/workflows/deploy.yml` automatiza el despliegue a Netlify. Se ha mejorado para incluir verificación de código y pruebas.

```yaml
# .github/workflows/deploy.yml
name: Deploy to Netlify
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
```

### Pre-commit Hooks

```bash
npm install -D husky lint-staged
npx husky install
```

## 📝 Roadmap

### Fase 1 - Lanzamiento ✅

- [x] Diseño luxury responsive
- [x] Navegación completa
- [x] Galería de colecciones
- [x] Despliegue en Netlify

### Fase 2 - Strapi CMS Integration (En Progreso)

- [ ] Configuración de infraestructura Strapi
- [ ] Migración de colecciones (NOVIA, XV, NOCHE, CORTOS, PRIMAVERA, ALQUILER)
- [ ] Contenido Red Carpet dinámico
- [ ] Panel de administración completo
- [ ] Gestión de imágenes optimizada
- [ ] Blog/Noticias dinámico

### Fase 3 - E-commerce

- [ ] Carrito de compras
- [ ] Pasarela de pagos (Stripe)
- [ ] Gestión de inventario
- [ ] Citas y consultas online

### Fase 4 - Avanzado

- [ ] Realidad aumentada (try-on virtual)
- [ ] Chat en vivo
- [ ] Multi-idioma (ES/EN)
- [ ] App móvil (React Native)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

**Alberto Rodríguez Couture**

- 📍 Av. Vallarta #1300, Guadalajara, Jalisco, México
- 📞 (33) 3826 2041
- 📱 WhatsApp: +52 33 3196 8024
- 📧 info@albertorodriguez.com
- 🌐 [albertorodriguezcom.netlify.app](https://albertorodriguezcom.netlify.app)

---

_Desarrollado con ❤️ para Alberto Rodríguez Couture_
