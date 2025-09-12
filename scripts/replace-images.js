import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recrear __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const homePagePath = path.join(__dirname, '..', 'client', 'src', 'pages', 'Home.tsx');

// Mapeo de URLs placeholder a palabras clave para la nueva imagen
const replacements = {
  // --- Colecciones Destacadas ---
  'https://images.unsplash.com/photo-1594736797933-d0c02e8ec2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000': 'https://source.unsplash.com/random/800x1000?wedding,dress,bride',
  'https://images.unsplash.com/photo-1582639592587-6d82b83fcef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000': 'https://source.unsplash.com/random/800x1000?quinceanera,dress',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000': 'https://source.unsplash.com/random/800x1000?evening,gown,fashion',
  'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000': 'https://source.unsplash.com/random/800x1000?cocktail,dress,elegant',

  // --- Red Carpet ---
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800': 'https://source.unsplash.com/random/600x800?celebrity,red,carpet',
  'https://images.unsplash.com/photo-1594736797933-d0c02e8ec2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800': 'https://source.unsplash.com/random/600x800?elegant,woman,event',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800': 'https://source.unsplash.com/random/600x800?fashion,week,runway',
  'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800': 'https://source.unsplash.com/random/600x800?fashion,show,catwalk',
};

fs.readFile(homePagePath, 'utf8', (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }

  let modifiedContent = data;
  let replacementCount = 0;

  for (const [oldUrl, newUrl] of Object.entries(replacements)) {
    // Escapamos la URL para usarla en el regex, especialmente por los signos de interrogación
    const regex = new RegExp(oldUrl.replace(/[.*+?^${}()|[\\]/g, '\$&'), 'g');
    if (regex.test(modifiedContent)) {
        modifiedContent = modifiedContent.replace(regex, newUrl);
        replacementCount++;
    }
  }

  if (replacementCount > 0) {
    fs.writeFile(homePagePath, modifiedContent, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error("Error al escribir en el archivo:", writeErr);
        return;
      }
      console.log(`¡Éxito! Se reemplazaron URLs de imágenes en ${replacementCount} lugares de ${path.basename(homePagePath)}`);
    });
  } else {
    console.log("No se encontraron URLs de imágenes dummy para reemplazar.");
  }
});