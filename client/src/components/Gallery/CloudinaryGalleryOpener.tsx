import { useEffect, useRef } from 'react';
import { useCloudinaryGallery } from '@/hooks/useCloudinaryGallery';
import { useGalleryState } from '@/hooks/useGalleryState';
import { toast } from '@/hooks/use-toast';
import type { GalleryImage } from '@/types/gallery';

interface CloudinaryGalleryOpenerProps {
  folderName: string;
  galleryTitle: string;
  onClose: () => void;
}

export const CloudinaryGalleryOpener = ({
  folderName,
  galleryTitle,
  onClose,
}: CloudinaryGalleryOpenerProps) => {
  const { data: images, isLoading, isError } = useCloudinaryGallery(folderName);
  const { openGallery, isOpen } = useGalleryState();
  const loadingToast = useRef<{ id: string; dismiss: () => void; } | null>(null);

  useEffect(() => {
    // Show loading toast only on the initial loading state
    if (isLoading && !images && !isError) {
      loadingToast.current = toast({
        title: 'Cargando Galería...',
        description: 'Por favor espera mientras se cargan las imágenes.',
      });
    }

    // Handle error state
    if (isError) {
      loadingToast.current?.dismiss();
      toast({
        title: 'Error al Cargar la Galería',
        description: `No se pudieron cargar las imágenes para "${galleryTitle}". Por favor, intenta de nuevo más tarde.`,
        variant: 'destructive',
      });
      onClose();
    }

    // Handle success state (when images are loaded)
    if (images) {
      loadingToast.current?.dismiss();
      if (images.length > 0) {
        const galleryImages: GalleryImage[] = images.map(img => ({
          id: img.public_id,
          cloudinaryId: img.public_id,
          title: img.public_id.split('/').pop() || '',
          description: '',
          category: 'model',
        }));
        openGallery(galleryImages, galleryTitle);
      } else {
        toast({
          title: 'Galería Vacía',
          description: `No hay imágenes en la galería "${galleryTitle}" en este momento.`,
        });
        onClose();
      }
    }

  }, [isLoading, isError, images, galleryTitle, openGallery, onClose]);

  useEffect(() => {
    // This effect handles closing the opener if the gallery is closed from within (e.g., by pressing Esc)
    if (!isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  // Cleanup the loading toast if the component unmounts unexpectedly
  useEffect(() => {
    return () => {
      loadingToast.current?.dismiss();
    };
  }, []);

  return null; // This component does not render anything itself.
};
