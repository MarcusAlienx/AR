import { motion } from 'framer-motion';
import { LucideIcon, Eye } from 'lucide-react';
import type { GalleryImage } from '@/types/gallery';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gallery?: GalleryImage[];
  onGalleryClick?: () => void;
}

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  gallery, 
  onGalleryClick 
}: ServiceCardProps) => {
  
  const handleClick = () => {
    if (gallery && onGalleryClick) {
      onGalleryClick();
    }
  };

  return (
    <motion.div
      className={`text-center group ${gallery ? 'cursor-pointer' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={handleClick}
      whileHover={gallery ? { y: -5 } : {}}
    >
      <div className="w-20 h-20 mx-auto mb-6 bg-luxury-light rounded-full flex items-center justify-center group-hover:bg-luxury-gold transition-all duration-300 relative">
        <Icon className="w-8 h-8 text-luxury-gray group-hover:text-white transition-colors duration-300" />
        
        {gallery && gallery.length > 0 && (
          <motion.div 
            className="absolute -top-2 -right-2 w-6 h-6 bg-luxury-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
          >
            <Eye className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </div>
      
      <h3 className="font-serif text-xl font-medium mb-4 tracking-luxury group-hover:text-luxury-gold transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed mb-4">
        {description}
      </p>
      
      {gallery && gallery.length > 0 && (
        <motion.div 
          className="opacity-0 group-hover:opacity-100 transition-all duration-300"
          initial={{ y: 10 }}
          whileHover={{ y: 0 }}
        >
          <span className="inline-flex items-center text-luxury-gold text-sm font-medium">
            <Eye className="w-4 h-4 mr-2" />
            Ver {gallery.length} {gallery.length === 1 ? 'imagen' : 'imágenes'}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ServiceCard;
