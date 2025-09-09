import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, RotateCw, Download } from 'lucide-react'
import { CloudinaryUrls } from '@/lib/cloudinary'
import type { PhotoGalleryProps } from '@/types/gallery'
import 'react-photo-view/dist/react-photo-view.css'

/**
 * Componente de galería de fotos premium con react-photo-view
 */
export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ 
  images, 
  title, 
  isOpen, 
  onClose, 
  initialIndex = 0 
}) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <motion.div
            className="flex justify-between items-center p-6 bg-gradient-to-b from-black/80 to-transparent"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div>
              <h2 className="text-2xl md:text-3xl text-white font-serif tracking-luxury">
                {title}
              </h2>
              <p className="text-white/70 text-sm mt-1">
                {images.length} {images.length === 1 ? 'imagen' : 'imágenes'}
              </p>
            </div>
            
            <motion.button
              onClick={onClose}
              className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </motion.div>

          {/* Gallery */}
          <div className="flex-1 overflow-hidden p-4">
            <PhotoProvider
              maskOpacity={0.9}
              bannerVisible={false}
              loop={true}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                {images.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative"
                  >
                    <PhotoView 
                      src={CloudinaryUrls.large(image.cloudinaryId)}
                    >
                      <div className="relative overflow-hidden rounded-lg cursor-pointer">
                        <img
                          src={CloudinaryUrls.thumbnail(image.cloudinaryId)}
                          alt={image.title}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                          <motion.div
                            className="opacity-0 group-hover:opacity-100"
                            initial={{ scale: 0.8 }}
                            whileHover={{ scale: 1 }}
                          >
                            <ZoomIn className="w-8 h-8 text-white" />
                          </motion.div>
                        </div>

                        {/* Badge de categoría */}
                        <div className="absolute top-2 left-2">
                          <span className="bg-luxury-gold text-black text-xs px-2 py-1 rounded-full font-medium">
                            {image.category.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </PhotoView>
                    
                    {/* Información de la imagen */}
                    <div className="mt-3 text-center">
                      <h4 className="text-white font-medium text-sm line-clamp-2">
                        {image.title}
                      </h4>
                      {image.description && (
                        <p className="text-white/70 text-xs mt-1 line-clamp-1">
                          {image.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </PhotoProvider>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PhotoGallery