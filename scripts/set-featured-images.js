

// Helper para obtener una imagen aleatoria de una galería
async function getRandomImageFromApi(category) {
  // La ruta de la API es la misma para todas las categorías
  const url = `http://localhost:5000/api/gallery/${category}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error fetching ${url}: ${response.statusText}`);
      return null;
    }
    const images = await response.json();
    if (images.length === 0) {
      console.log(`- No se encontraron imágenes para la categoría: ${category}`);
      return null;
    }
    const randomIndex = Math.floor(Math.random() * images.length);
    console.log(`+ Imagen encontrada para ${category}: ${images[randomIndex].secure_url}`);
    return images[randomIndex].secure_url;
  } catch (error) {
    console.error(`Error conectando a la API para ${category}. ¿Está corriendo el servidor de desarrollo?`, error);
    return null;
  }
}

// --- DATOS ORIGINALES (COPIADOS DE Home.tsx) ---
const collectionsData = [
    {
      title: 'NOVIA',
      subtitle: 'COLECCIÓN ETERNA',
      category: 'novia',
      href: '/collections/novia',
    },
    {
      title: 'XV AÑOS',
      subtitle: 'MOMENTO PRINCESA',
      category: 'xv',
      href: '/collections/xv',
    },
    {
      title: 'NOCHE',
      subtitle: 'ELEGANCIA IMPERIAL',
      category: 'noche',
      href: '/collections/noche',
    },
    {
      title: 'CORTOS',
      subtitle: 'SOFISTICACIÓN DORADA',
      category: 'cortos',
      href: '/collections/cortos',
    },
];

const redCarpetEventsData = [
    {
      title: 'CELEBRITIES',
      subtitle: 'ESTRELLAS INTERNACIONALES',
      category: 'celebrities',
    },
    {
      title: 'CLIENTAS',
      subtitle: 'MOMENTOS ESPECIALES',
      category: 'clientas',
    },
    {
      title: 'FASHION WEEK',
      subtitle: 'PASARELAS INTERNACIONALES',
      category: 'fashion-week',
    },
    {
      title: 'DESFILES',
      subtitle: 'ALTA COSTURA MEXICANA',
      category: 'desfiles',
    },
];

async function updateHomePageImages() {
  console.log('\nIniciando actualización de imágenes destacadas...');
  console.log('Asegúrate de que el servidor de desarrollo (npm run dev) esté corriendo.\n');

  // Actualizar colecciones
  for (const collection of collectionsData) {
    const randomImage = await getRandomImageFromApi(collection.category);
    if (randomImage) {
      collection.image = randomImage;
    }
  }

  // Actualizar Red Carpet
  for (const event of redCarpetEventsData) {
    const randomImage = await getRandomImageFromApi(event.category);
    if (randomImage) {
      event.image = randomImage;
    }
  }

  // Generar el nuevo código para pegar en Home.tsx
  console.log('\n---------------------------------------------------');
  console.log("--- COPIA Y PEGA ESTE CÓDIGO EN Home.tsx ---");
  console.log('---------------------------------------------------\n');
  
  // NOTA: La data de la galería interna se ha omitido para simplicidad.
  // El script solo actualiza la imagen principal de la tarjeta.
  const collectionsString = `const collections = ${JSON.stringify(collectionsData.map(c => ({...c, gallery: []})), null, 2)};`;
  const redCarpetString = `const redCarpetEvents = ${JSON.stringify(redCarpetEventsData.map(e => ({...e, gallery: []})), null, 2)};`;

  console.log("// Reemplaza el array 'collections' con esto:");
  console.log(collectionsString);
  console.log("\n// Reemplaza el array 'redCarpetEvents' con esto:");
  console.log(redCarpetString);
  console.log('\n---------------------------------------------------');
  console.log("--- FIN DEL CÓDIGO ---");
  console.log('---------------------------------------------------\n');
}

updateHomePageImages();
