import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handler } from './collections'; // El handler de la Netlify Function
import { storage } from '../../server/storage'; // El objeto storage que vamos a mockear
import type { HandlerEvent, HandlerContext } from '@netlify/functions';
import type { Collection } from '../../shared/schema';

// Mockear el módulo de storage
vi.mock('../../server/storage', () => {
  return {
    storage: {
      getCollections: vi.fn(),
      getCollectionBySlug: vi.fn(), // Mockear otros métodos usados por el handler
      getFeaturedCollections: vi.fn(),
      getCollection: vi.fn(),
      createCollection: vi.fn(),
    },
  };
});

describe('Netlify Function: collections', () => {

  // Resetear mocks antes de cada prueba
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return all collections for GET /api/collections', async () => {
    // 1. Setup del Mock
    const mockCollections: Collection[] = [
      { id: '1', name: 'Colección 1', slug: 'coleccion-1', createdAt: new Date(), updatedAt: new Date(), featured: false, image: '' },
      { id: '2', name: 'Colección 2', slug: 'coleccion-2', createdAt: new Date(), updatedAt: new Date(), featured: false, image: '' },
    ];
    // Hacemos que la función mockeada devuelva nuestros datos de prueba
    vi.mocked(storage.getCollections).mockResolvedValue(mockCollections);

    // 2. Setup del Evento de Netlify
    const event: Partial<HandlerEvent> = {
      httpMethod: 'GET',
      path: '/.netlify/functions/collections', // Usar el path real que Netlify provee
    };

    // 3. Ejecutar el Handler
    const response = await handler(event as HandlerEvent, {} as HandlerContext, () => {});

    // 4. Asserts: Verificar el resultado
    expect(response.statusCode).toBe(200);
    // We need to serialize and deserialize the dates to compare them properly
    expect(JSON.parse(response.body)).toEqual(JSON.parse(JSON.stringify(mockCollections)));
    // Verificar que la función de storage fue llamada
    expect(storage.getCollections).toHaveBeenCalledTimes(1);
  });

  it('should return a collection for GET /api/collections/slug/:slug', async () => {
    const mockCollection: Collection = { id: '1', name: 'Test Collection', slug: 'test-collection', createdAt: new Date(), updatedAt: new Date(), featured: false, image: '' };
    vi.mocked(storage.getCollectionBySlug).mockResolvedValue(mockCollection);

    const event: Partial<HandlerEvent> = {
      httpMethod: 'GET',
      path: '/.netlify/functions/collections/slug/test-collection',
    };

    const response = await handler(event as HandlerEvent, {} as HandlerContext, () => {});

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(JSON.parse(JSON.stringify(mockCollection)));
    expect(storage.getCollectionBySlug).toHaveBeenCalledWith('test-collection');
  });

});
