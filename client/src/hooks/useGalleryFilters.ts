import { useState, useMemo } from 'react';
import type { GalleryImage } from '@/types/gallery';

export interface UseGalleryFiltersReturn {
  activeFilter: string;
  filteredImages: GalleryImage[];
  imageCount: Record<string, number>;
  setActiveFilter: (filter: string) => void;
  resetFilters: () => void;
}

/**
 * Hook para manejar filtros de galería por categoría
 */
export const useGalleryFilters = (images: GalleryImage[]): UseGalleryFiltersReturn => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Contar imágenes por categoría
  const imageCount = useMemo(() => {
    const counts: Record<string, number> = { all: images.length };
    
    images.forEach(image => {
      const category = image.category;
      counts[category] = (counts[category] || 0) + 1;
    });
    
    return counts;
  }, [images]);

  // Filtrar imágenes según la categoría activa
  const filteredImages = useMemo(() => {
    if (activeFilter === 'all') {
      return images;
    }
    return images.filter(image => image.category === activeFilter);
  }, [images, activeFilter]);

  const resetFilters = () => {
    setActiveFilter('all');
  };

  return {
    activeFilter,
    filteredImages,
    imageCount,
    setActiveFilter,
    resetFilters
  };
};