import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { GALLERY_CATEGORIES } from '@/types/gallery';
import type { GalleryCategory } from '@/types/gallery';

interface GalleryFiltersProps {
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
  imageCount: Record<string, number>;
}

export const GalleryFilters: React.FC<GalleryFiltersProps> = ({
  activeFilter,
  onFilterChange,
  imageCount
}) => {
  const allCategories: GalleryCategory[] = [
    {
      id: 'all',
      label: 'Todas',
      description: 'Ver todas las imágenes',
      icon: '📱'
    },
    ...GALLERY_CATEGORIES
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center mb-6">
        <Filter className="w-5 h-5 text-luxury-gold mr-2" />
        <h3 className="text-lg font-medium text-gray-800">Filtrar por categoría</h3>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        {allCategories.map((category) => {
          const count = imageCount[category.id] || 0;
          const isActive = activeFilter === category.id;
          
          return (
            <motion.button
              key={category.id}
              onClick={() => onFilterChange(category.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${isActive 
                  ? 'bg-luxury-gold text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-luxury-gold/10 border border-gray-200'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
              {count > 0 && (
                <span className={`
                  ml-2 px-2 py-1 rounded-full text-xs
                  ${isActive ? 'bg-white/20' : 'bg-gray-100'}
                `}>
                  {count}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryFilters;