import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary SDK
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

// Interface for the raw resource object from Cloudinary API
interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

/**
 * Fetches all images from a specific folder in Cloudinary.
 * @param prefix The prefix to search for (e.g., 'noche').
 * @returns A promise that resolves to an array of image resources.
 */
export async function getImagesFromFolder(prefix: string): Promise<CloudinaryImage[]> {
  const lowerCasePrefix = prefix.toLowerCase();
  console.log(`[SERVER] Buscando imágenes en Cloudinary con el prefijo original: ${prefix} (normalizado a: ${lowerCasePrefix})`);
  console.log(`[SERVER] Cloudinary Config: Cloud Name - ${process.env.CLOUDINARY_CLOUD_NAME}, API Key - ${process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not Set'}`);

  try {
    const { resources } = await cloudinary.api.resources({
      type: 'upload',
      prefix: lowerCasePrefix, // Usamos el prefijo en minúsculas para búsqueda case-insensitive
      max_results: 500, // Aumentamos el límite al máximo permitido
    });

    console.log(`[SERVER] Cloudinary encontró ${resources.length} imágenes con el prefijo '${lowerCasePrefix}'.`);

    // Filtramos para excluir variaciones de tamaño como 'large_*' y 'medium_*'
    const filteredResources = resources.filter((res: CloudinaryResource) => 
      !res.public_id.includes('large_') && !res.public_id.includes('medium_')
    );

    console.log(`[SERVER] Después de filtrar 'large_' y 'medium_', quedan ${filteredResources.length} imágenes.`);
    console.log(`[SERVER] Cloudinary API Result (first 5):`, filteredResources.slice(0, 5).map((r: CloudinaryResource) => r.public_id));

    return filteredResources.map((res: CloudinaryResource) => ({
      public_id: res.public_id,
      secure_url: res.secure_url,
      width: res.width,
      height: res.height,
    }));
  } catch (error) {
    console.error(`[SERVER] Error fetching images from Cloudinary with prefix "${prefix}":`, error);
    throw new Error('Failed to fetch images from Cloudinary.');
  }
}
