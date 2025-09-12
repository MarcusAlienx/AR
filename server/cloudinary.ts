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

/**
 * Fetches all images from a specific folder in Cloudinary.
 * @param prefix The prefix to search for (e.g., 'noche').
 * @returns A promise that resolves to an array of image resources.
 */
export async function getImagesFromFolder(prefix: string): Promise<CloudinaryImage[]> {
  console.log(`[SERVER] Buscando imágenes en Cloudinary con el prefijo: ${prefix}`);

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: prefix, // Usamos el prefijo directamente (ej. 'noche')
      max_results: 100, 
    });

    console.log(`[SERVER] Cloudinary encontró ${result.resources.length} imágenes.`);

    return result.resources.map((res: any) => ({
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
