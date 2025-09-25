# Documentación de la API

Esta documentación describe los endpoints de la API del backend de Alberto Rodríguez Couture.

## Arquitectura de la API

La API está construida con una arquitectura dual para optimizar tanto el desarrollo como la producción:

-   **Producción:** Las funciones serverless de Netlify se ejecutan en el borde. El enrutamiento es gestionado por Netlify, que redirige las peticiones de `/api/` a las funciones correspondientes.
-   **Desarrollo:** Un servidor Express.js local se utiliza para un desarrollo rápido y pruebas.

Todos los endpoints listados a continuación deben ser llamados usando el prefijo `/api/`. Por ejemplo, `GET /collections` se convierte en `GET /api/collections`.

## Endpoints Principales

### Colecciones

#### `GET /api/collections`

Recupera una lista de todas las colecciones.

- **Método:** `GET`
- **Respuesta Exitosa (200):**
  ```json
  [
    {
      "id": "1",
      "name": "Colección Novia",
      "slug": "novia",
      "image": "https://url.to/image.jpg",
      "featured": true,
      "createdAt": "2025-09-22T10:00:00.000Z",
      "updatedAt": "2025-09-22T10:00:00.000Z"
    },
    // ...otras colecciones
  ]
  ```

#### `GET /api/collections/featured`

Recupera solo las colecciones marcadas como destacadas (`featured: true`).

- **Método:** `GET`
- **Respuesta Exitosa (200):** Un array de objetos de tipo `Collection`.

#### `GET /api/collections/slug/:slug`

Recupera una colección específica por su `slug`.

- **Método:** `GET`
- **Parámetros:**
  - `slug` (string): El slug de la colección (ej. `novia`).
- **Respuesta Exitosa (200):**
  ```json
  {
    "id": "1",
    "name": "Colección Novia",
    "slug": "novia",
    // ...otros campos
  }
  ```
- **Respuesta de Error (404):** Si la colección no se encuentra.

---

### Galería

#### `GET /api/gallery/:folderName`

Recupera todas las imágenes de una carpeta (prefijo) específica de Cloudinary.

- **Método:** `GET`
- **Parámetros:**
  - `folderName` (string): El nombre de la carpeta/prefijo a buscar en Cloudinary. La búsqueda es **case-insensitive**.
- **Respuesta Exitosa (200):**
  ```json
  [
    {
      "public_id": "novia/imagen_1",
      "secure_url": "https://res.cloudinary.com/.../novia/imagen_1.jpg",
      "width": 1200,
      "height": 1800
    },
    // ...otras imágenes
  ]
  ```
- **Notas:**
  - El endpoint automáticamente filtra las imágenes que contengan `large_` o `medium_` en su `public_id` para devolver solo las imágenes base.

---

### Proyectos

#### `GET /api/projects`
Recupera todos los proyectos.

#### `GET /api/projects/featured`
Recupera los proyectos destacados.

#### `GET /api/projects/collection/:collectionId`
Recupera los proyectos de una colección específica.

#### `GET /api/projects/:id`
Recupera un proyecto por su ID.

#### `POST /api/projects`
Crea un nuevo proyecto.
- **Body:** `insertProjectSchema`

---

### Biografía

#### `GET /api/biography`
Recupera la biografía.

#### `PUT /api/biography`
Actualiza la biografía.
- **Body:** `insertBiographySchema`

---

### Noticias

#### `GET /api/news`
Recupera todas las noticias.

#### `GET /api/news/published`
Recupera las noticias publicadas.

#### `GET /api/news/:id`
Recupera una noticia por su ID.

#### `GET /api/news/slug/:slug`
Recupera una noticia por su slug.

#### `POST /api/news`
Crea una nueva noticia.
- **Body:** `insertNewsSchema`

---

### Contacto

#### `POST /api/contact`
Envía un mensaje de contacto.
- **Body:** `insertContactSchema`

#### `GET /api/contacts`
Recupera todos los mensajes de contacto.

---

### Email

#### `POST /.netlify/functions/send-email`
Envía un correo electrónico. Esta es una Netlify Function.
- **Body:**
  - `type`: "contact" o "newsletter"
  - `...formData`: El resto de los datos del formulario.

---

## Esquemas de Datos

Los tipos de datos principales (`Collection`, `Project`, `User`, etc.) están definidos en el archivo `shared/schema.ts` y son compartidos entre el frontend y el backend.