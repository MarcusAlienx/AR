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
  resource_type?: string;
}

// Interface for the raw resource object from Cloudinary API
interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  resource_type?: string;
}

/**
 * Fetches all images (and videos for desfiles) from a specific folder in Cloudinary.
 * @param prefix The prefix to search for (e.g., 'noche').
 * @returns A promise that resolves to an array of image/video resources.
 */
export async function getImagesFromFolder(prefix: string): Promise<CloudinaryImage[]> {
  const lowerCasePrefix = prefix.toLowerCase();
  console.log(`[SERVER] Buscando recursos en Cloudinary con el prefijo original: ${prefix} (normalizado a: ${lowerCasePrefix})`);
  console.log(`[SERVER] Cloudinary Config: Cloud Name - ${process.env.CLOUDINARY_CLOUD_NAME}, API Key - ${process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not Set'}`);

  try {
    // Para 'desfiles', buscar también videos
    const resourceTypes = lowerCasePrefix === 'desfiles' ? ['image', 'video'] : ['image'];
    console.log(`[SERVER] Resource types to search: ${resourceTypes.join(', ')}`);

    const allResources: CloudinaryResource[] = [];

    for (const resourceType of resourceTypes) {
      console.log(`[SERVER] Searching for resource_type: ${resourceType} with prefix: ${lowerCasePrefix}`);
      const { resources } = await cloudinary.api.resources({
        type: 'upload',
        resource_type: resourceType,
        prefix: lowerCasePrefix,
        max_results: 500,
      });
      console.log(`[SERVER] Found ${resources.length} resources for ${resourceType}`);
      allResources.push(...resources);
    }

    console.log(`[SERVER] Cloudinary encontró ${allResources.length} recursos totales con el prefijo '${lowerCasePrefix}'.`);
    if (allResources.length > 0) {
      console.log(`[SERVER] Sample public_ids:`, allResources.slice(0, 5).map((r: CloudinaryResource) => r.public_id));
    }

    // Filtramos para excluir variaciones de tamaño como 'large_*', 'medium_*' y 'thumb*'
    const filteredResources = allResources.filter((res: CloudinaryResource) =>
      !res.public_id.includes('large_') && !res.public_id.includes('medium_') && !res.public_id.includes('thumb')
    );

    // Eliminamos duplicados basados en public_id (por si acaso)
    const uniqueResources = filteredResources.filter((res: CloudinaryResource, index: number, self: CloudinaryResource[]) =>
      index === self.findIndex((r: CloudinaryResource) => r.public_id === res.public_id)
    );

    console.log(`[SERVER] Después de filtrar variaciones de tamaño y duplicados, quedan ${uniqueResources.length} recursos únicos.`);
    console.log(`[SERVER] Final Cloudinary API Result (first 5):`, uniqueResources.slice(0, 5).map((r: CloudinaryResource) => ({ public_id: r.public_id, resource_type: r.resource_type })));

    return uniqueResources.map((res: CloudinaryResource) => ({
      public_id: res.public_id,
      secure_url: res.secure_url,
      width: res.width,
      height: res.height,
      resource_type: res.resource_type || 'image',
    }));
  } catch (error) {
    console.error(`[SERVER] Error fetching images from Cloudinary with prefix "${prefix}":`, error);
    throw new Error('Failed to fetch images from Cloudinary.');
  }
}
