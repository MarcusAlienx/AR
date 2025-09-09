import { useState, useCallback, useEffect } from 'react'
import type { GalleryImage, UseGalleryReturn } from '@/types/gallery'

/**
 * Hook para gestionar el estado de las galerías de fotos
 */
export const useGallery = (): UseGalleryReturn => {
  const [activeGallery, setActiveGallery] = useState<{
    images: GalleryImage[]
    title: string
    initialIndex: number
  } | null>(null)

  const openGallery = useCallback((
    images: GalleryImage[], 
    title: string, 
    initialIndex = 0
  ) => {
    setActiveGallery({ images, title, initialIndex })
    // Prevenir scroll del body cuando la galería está abierta
    document.body.style.overflow = 'hidden'
  }, [])

  const closeGallery = useCallback(() => {
    setActiveGallery(null)
    // Restaurar scroll del body
    document.body.style.overflow = 'unset'
  }, [])

  const nextImage = useCallback(() => {
    if (!activeGallery) return
    
    const currentIndex = activeGallery.initialIndex
    const nextIndex = (currentIndex + 1) % activeGallery.images.length
    
    setActiveGallery(prev => prev ? {
      ...prev,
      initialIndex: nextIndex
    } : null)
  }, [activeGallery])

  const previousImage = useCallback(() => {
    if (!activeGallery) return
    
    const currentIndex = activeGallery.initialIndex
    const prevIndex = currentIndex === 0 ? activeGallery.images.length - 1 : currentIndex - 1
    
    setActiveGallery(prev => prev ? {
      ...prev,
      initialIndex: prevIndex
    } : null)
  }, [activeGallery])

  // Manejar teclas del teclado
  useEffect(() => {
    if (!activeGallery) return

    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          closeGallery()
          break
        case 'ArrowLeft':
          previousImage()
          break
        case 'ArrowRight':
          nextImage()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [activeGallery, closeGallery, nextImage, previousImage])

  // Cleanup al desmontar el componente
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return {
    activeGallery,
    isOpen: !!activeGallery,
    openGallery,
    closeGallery,
    nextImage,
    previousImage
  }
}

/**
 * Hook para filtrar imágenes por categoría
 */
export const useGalleryFilter = (images: GalleryImage[], initialCategory?: string) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all')

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(image => image.category === selectedCategory)

  const categories = Array.from(new Set(images.map(img => img.category)))

  return {
    filteredImages,
    selectedCategory,
    setSelectedCategory,
    categories,
    totalImages: images.length,
    filteredCount: filteredImages.length
  }
}