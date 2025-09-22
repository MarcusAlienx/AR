
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs/promises';

// Load environment variables from .env file
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function listAllAssets() {
  console.log('Fetching all assets from Cloudinary...');
  let allAssets = [];
  let nextCursor = null;

  try {
    do {
      const result = await cloudinary.api.resources({
        type: 'upload',
        max_results: 500, // Max per request
        next_cursor: nextCursor,
      });

      allAssets = allAssets.concat(result.resources);
      nextCursor = result.next_cursor;

      console.log(`Fetched ${result.resources.length} assets. Total: ${allAssets.length}. More available: ${!!nextCursor}`);

    } while (nextCursor);

    console.log(`
Total assets found: ${allAssets.length}`);

    // Generate Markdown content
    let markdownContent = `# Cloudinary Asset Report\n\n`;
    markdownContent += `*Generated on: ${new Date().toUTCString()}*
`;
    markdownContent += `*Total assets found: ${allAssets.length}*

`;
    markdownContent += `| Asset Type | Dimensions (WxH) | Public ID | Secure URL |
`;
    markdownContent += `|------------|--------------------|-----------|------------|
`;

    allAssets.sort((a, b) => a.public_id.localeCompare(b.public_id));

    for (const asset of allAssets) {
      const { resource_type, format, width, height, public_id, secure_url } = asset;
      const type = `${resource_type}/${format}`;
      const dimensions = (width && height) ? `${width}x${height}` : 'N/A';
      markdownContent += `| ${type} | ${dimensions} | 
${public_id}
 | [Link](${secure_url}) |
`;
    }

    // Write to file
    const outputPath = 'CLOUDINARY_ASSET_LIST.md';
    await fs.writeFile(outputPath, markdownContent);
    console.log(`
Successfully generated asset list at: ${outputPath}`);

  } catch (error) {
    console.error('Error fetching assets from Cloudinary:', error);
  }
}

listAllAssets();
