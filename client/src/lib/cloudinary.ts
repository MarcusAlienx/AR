import { Cloudinary } from '@cloudinary/url-gen'
import { auto } from '@cloudinary/url-gen/actions/resize'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'

// Configuración de Cloudinary
export const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'alberto-rodriguez-couture'
  }
})

/**
 * Genera URL optimizada para imágenes de Cloudinary
 */
export const getOptimizedImageUrl = (
  publicId: string, 
  width = 800, 
  height = 600,
  quality = 'auto'
) => {
  return cld.image(publicId)
    .format('auto')
    .quality(quality)
    .resize(auto().width(width).height(height).gravity(autoGravity()))
    .toURL()
}

/**
 * URLs optimizadas para diferentes casos de uso
 */
export const CloudinaryUrls = {
  // Thumbnail para grillas de galería
  thumbnail: (publicId: string) => getOptimizedImageUrl(publicId, 400, 300, 'auto:good'),
  
  // Imagen mediana para hover y previews
  medium: (publicId: string) => getOptimizedImageUrl(publicId, 800, 600, 'auto:good'),
  
  // Imagen grande para lightbox
  large: (publicId: string) => getOptimizedImageUrl(publicId, 1200, 900, 'auto:best'),
  
  // Imagen hero para banners
  hero: (publicId: string) => getOptimizedImageUrl(publicId, 1920, 1080, 'auto:best'),
  
  // Imagen mobile optimizada
  mobile: (publicId: string) => getOptimizedImageUrl(publicId, 600, 450, 'auto:good')
}

/**
 * Configuración por defecto para react-photo-view
 */
export const photoViewConfig = {
  maskOpacity: 0.9,
  bannerVisible: false,
  showTotal: true,
  loop: true,
  speed: () => 300,
  easing: (type: string) => type === 'in' ? 'ease-in' : 'ease-out'
}

/**
 * Utilidades para nombres de archivos de Cloudinary
 */
export const CloudinaryUtils = {
  // Generar ID único para una imagen
  generateImageId: (category: string, type: string, index: number) => {
    return `${category}_${type}_${String(index).padStart(2, '0')}`
  },
  
  // Extraer información de un ID de Cloudinary
  parseImageId: (cloudinaryId: string) => {
    const parts = cloudinaryId.split('_')
    return {
      category: parts[0],
      type: parts[1], 
      index: parseInt(parts[2]) || 0
    }
  },
  
  // Validar si un ID de Cloudinary es válido
  isValidImageId: (cloudinaryId: string) => {
    return /^[a-z]+_[a-z]+_\d{2}$/.test(cloudinaryId)
  }
}