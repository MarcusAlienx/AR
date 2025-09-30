import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

console.log(`[gallery.ts] CLOUDINARY_CLOUD_NAME: ${process.env.CLOUDINARY_CLOUD_NAME ? 'Loaded' : 'NOT LOADED'}`);

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { storage } from "../../server/storage";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Extract the folder path from the request
  // e.g., /.netlify/functions/gallery/my-folder -> my-folder
  const pathParts = event.path.split('/');
  const folderName = pathParts[pathParts.length - 1];
  console.log(`[gallery.ts] Received request for folder: ${folderName}`);

  if (!folderName) {
    return { statusCode: 400, body: JSON.stringify({ error: "Folder name is required" }) };
  }

  try {
    console.log(`[gallery.ts] Calling storage.getGalleryImages with folderName: ${folderName}`);
    const images = await storage.getGalleryImages(folderName);
    console.log(`[gallery.ts] storage.getGalleryImages returned ${images.length} images`);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(images),
    };
  } catch (error) {
    const err = error as Error;
    console.error(`Failed to fetch gallery images for folder "${folderName}":`, err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch gallery images", details: err.message }),
    };
  }
};

export { handler };
