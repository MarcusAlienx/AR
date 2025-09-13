import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import type { GalleryImage } from '@/types/gallery';

interface CollectionCardProps {
  title: string;
  subtitle: string;
  image: string;
  href?: string;
  className?: string;
  gallery?: GalleryImage[];
  onGalleryClick?: () => void;
}

const CollectionCard = ({ 
  title, 
  subtitle, 
  image, 
  href = '#', 
  className = '', 
  gallery, 
  onGalleryClick 
}: CollectionCardProps) => {
  
  const handleClick = (e: React.MouseEvent) => {
    if (gallery && onGalleryClick) {
      e.preventDefault();
      onGalleryClick();
    }
    // Si no hay galería, el enlace normal funcionará
  };

  return (
    <motion.div
      className={`group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <a href={href} onClick={handleClick}>
        <div className="relative overflow-hidden bg-white">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-96 object-cover transition-transform duration-700"
            whileHover={{ scale: 1.05 }}
            loading="lazy"
            onError={(e) => {
              console.error('Collection image failed to load:', image);
              // Fallback to a more reliable image if current one fails
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200';
            }}
          />
          
          {/* Overlay con información de galería */}
          <motion.div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {gallery && gallery.length > 0 && (
              <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90">
                <div className="w-16 h-16 bg-luxury-gold/90 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <p className="font-medium text-lg mb-1">Ver Galería</p>
                <p className="text-sm text-white/80">{gallery.length} {gallery.length === 1 ? 'imagen' : 'imágenes'}</p>
              </div>
            )}
          </motion.div>
        </div>
        
        <div className="pt-6 text-center">
          <h3 className="font-serif text-2xl font-light mb-2 tracking-luxury group-hover:text-luxury-gold transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-gray-600 tracking-luxury">
            {subtitle}
          </p>
          
          {gallery && gallery.length > 0 && (
            <motion.div 
              className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ y: 10 }}
              whileHover={{ y: 0 }}
            >
              <span className="inline-flex items-center text-luxury-gold text-sm font-medium">
                <Eye className="w-4 h-4 mr-2" />
                Explorar Colección
              </span>
            </motion.div>
          )}
        </div>
      </a>
    </motion.div>
  );
};

export default CollectionCard;
