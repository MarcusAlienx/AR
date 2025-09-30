import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { CloudinaryImage } from '@/types/gallery';
import { Skeleton } from '@/components/UI/skeleton';
import { useEffect } from 'react';

// Función para llamar a nuestra API del backend
const fetchImagesByFolder = async (slug: string): Promise<CloudinaryImage[]> => {
  // La ruta de la API ahora solo usa el slug, ej: /api/gallery/celebrities
  const response = await fetch(`/api/gallery/${slug}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

interface RedCarpetPageProps {
  slug: string;
}

// Helper para formatear el slug para títulos (ej. 'fashion-week' -> 'Fashion Week')
const formatSlug = (slug: string = '') => {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};

const RedCarpetPage = ({ slug }: RedCarpetPageProps) => {
  const formattedTitle = formatSlug(slug);

  const { data: media, error, isLoading } = useQuery({
    queryKey: ['redCarpetMedia', slug],
    queryFn: () => fetchImagesByFolder(slug!),
    enabled: !!slug,
  });

  const images = media?.filter(item => item.resource_type === 'image') || [];
  const videos = media?.filter(item => item.resource_type === 'video') || [];

  useEffect(() => {
    if (isLoading) {
      console.log(`[FRONTEND] Cargando imágenes para Red Carpet: ${slug}`);
    } else if (error) {
      console.error(`[FRONTEND] Error al cargar Red Carpet ${slug}:`, error);
    } else {
      console.log(`[FRONTEND] Datos recibidos para Red Carpet ${slug}:`, images);
    }
  }, [slug, images, isLoading, error]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-medium tracking-luxury text-center mb-8 capitalize"><Skeleton className="h-8 w-64 mx-auto" /></h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10">Error al cargar la galería: {error.message}</div>;
  }

  if (!images || images.length === 0) {
    return (
      <>
        <Helmet>
          <title>{`Red Carpet: ${formattedTitle} - Alberto Rodríguez Couture`}</title>
          <meta name="description" content={`Galería de eventos Red Carpet con diseños de Alberto Rodríguez en la categoría ${formattedTitle}.`} />
        </Helmet>
        <div className="container mx-auto px-4 py-8 pt-24 text-center">
          <h1 className="text-3xl font-medium tracking-luxury mb-4 capitalize">
            Red Carpet: {slug?.replace('-', ' ')}
          </h1>
          <p className="text-gray-600">No se encontraron imágenes para esta categoría.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Red Carpet: ${formattedTitle} - Alberto Rodríguez Couture`}</title>
        <meta name="description" content={`Explora la galería de eventos Red Carpet con diseños de alta costura de Alberto Rodríguez en la categoría ${formattedTitle}.`} />
      </Helmet>
      <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-medium tracking-luxury text-center mb-8 capitalize">
        Red Carpet: {slug?.replace('-', ' ')}
      </h1>

      {/* Videos Section */}
      {videos.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-medium tracking-luxury mb-6">Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div key={video.public_id} className="aspect-video">
                <video
                  controls
                  className="w-full h-full object-cover"
                  poster={video.secure_url.replace(/\.[^.]+$/, '.jpg').replace('/upload/', '/upload/so_0/')} // Add blur for poster
                >
                  <source src={video.secure_url.replace(/\.[^.]+$/, '.mp4')} type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>
                <p className="text-sm text-gray-600 mt-2">Video {index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Images Section */}
      {images.length > 0 && (
        <div>
          <h2 className="text-2xl font-medium tracking-luxury mb-6">Imágenes</h2>
          <PhotoProvider>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <PhotoView key={image.public_id} src={image.secure_url}>
                  <img
                    src={image.secure_url}
                    alt={`Imagen ${index + 1} de Red Carpet: ${slug}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </PhotoView>
              ))}
            </div>
          </PhotoProvider>
        </div>
      )}
    </div>
    </>
  );
};

export default RedCarpetPage;