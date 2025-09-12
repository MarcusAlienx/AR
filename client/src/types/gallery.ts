/**
 * Tipos TypeScript para el sistema de galerías
 */

export interface GalleryImage {
  id: string
  cloudinaryId: string
  title: string
  description?: string
  category: 'detail' | 'process' | 'event' | 'model' | 'inspiration'
  tags?: string[]
  photographer?: string
  featured?: boolean
}

export interface Collection {
  id: number
  title: string
  description: string
  image: string
  link: string
  category: 'novia' | 'xv' | 'noche' | 'cortos' | 'primavera' | 'alquiler'
  season: string
  pieces: number
  gallery: GalleryImage[]
  featured?: boolean
}

export interface RedCarpetEvent {
  title: string
  subtitle: string
  image: string
  featuredImage?: string
  gallery: GalleryImage[]
  category: 'celebrities' | 'clientas' | 'fashion-week' | 'desfiles'
}

export interface PhotoGalleryProps {
  images: GalleryImage[]
  title: string
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
}

export interface GalleryCategory {
  id: string
  label: string
  description: string
  icon?: string
}

/**
 * Configuración para diferentes tipos de galería
 */
export const GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    id: 'detail',
    label: 'Detalles',
    description: 'Detalles artesanales y técnicas de costura',
    icon: '🔍'
  },
  {
    id: 'process',
    label: 'Proceso',
    description: 'Proceso de creación en el atelier',
    icon: '✂️'
  },
  {
    id: 'event',
    label: 'Eventos',
    description: 'Eventos y ocasiones especiales',
    icon: '✨'
  },
  {
    id: 'model',
    label: 'Modelos',
    description: 'Sesiones fotográficas profesionales',
    icon: '📸'
  },
  {
    id: 'inspiration',
    label: 'Inspiración',
    description: 'Proceso creativo y sketches',
    icon: '🎨'
  }
]

/**
 * Estados del hook useGalleryState
 */
export interface GalleryState {
  activeGallery: {
    images: GalleryImage[]
    title: string
    initialIndex: number
  } | null
  isOpen: boolean
}

export interface GalleryStateActions {
  openGallery: (images: GalleryImage[], title: string, initialIndex?: number) => void
  closeGallery: () => void
  nextImage: () => void
  previousImage: () => void
}

export type UseGalleryStateReturn = GalleryState & GalleryStateActions