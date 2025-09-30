import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';
import * as schema from '../shared/schema.ts';

// Load environment variables
dotenv.config();

async function deleteAlquilerCollection() {
  try {
    console.log('Deleting alquiler collection from database...');

    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql, { schema });

    const result = await db.delete(schema.collections).where(eq(schema.collections.slug, 'alquiler')).returning();

    if (result.length > 0) {
      console.log('Successfully deleted alquiler collection:', result[0]);
    } else {
      console.log('No alquiler collection found to delete.');
    }

  } catch (error) {
    console.error('Error deleting alquiler collection:', error);
  }
}

deleteAlquilerCollection();