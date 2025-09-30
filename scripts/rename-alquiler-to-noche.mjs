import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function renameAlquilerToNoche() {
  console.log('Starting to rename alquiler images to noche...');

  let allAssets = [];
  let nextCursor = null;

  // Fetch all assets with prefix 'alquiler'
  try {
    do {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'alquiler',
        max_results: 500,
        next_cursor: nextCursor,
      });

      allAssets = allAssets.concat(result.resources);
      nextCursor = result.next_cursor;

      console.log(`Fetched ${result.resources.length} alquiler assets. Total: ${allAssets.length}`);

    } while (nextCursor);

    console.log(`Total alquiler assets found: ${allAssets.length}`);

    // Rename each asset
    for (const asset of allAssets) {
      const oldPublicId = asset.public_id;
      const newPublicId = oldPublicId.replace(/^alquiler/, 'noche');

      if (oldPublicId !== newPublicId) {
        try {
          console.log(`Renaming ${oldPublicId} to ${newPublicId}`);
          await cloudinary.uploader.rename(oldPublicId, newPublicId);
          console.log(`Successfully renamed ${oldPublicId} to ${newPublicId}`);
        } catch (error) {
          console.error(`Failed to rename ${oldPublicId}:`, error);
        }
      }
    }

    console.log('Finished renaming all alquiler assets to noche.');

  } catch (error) {
    console.error('Error fetching or renaming assets:', error);
  }
}

renameAlquilerToNoche();