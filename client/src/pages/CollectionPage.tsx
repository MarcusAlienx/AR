import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { CloudinaryImage } from '@/server/cloudinary';
import { Skeleton } from '@/components/UI/skeleton';
import { useEffect } from 'react';

// Función para llamar a nuestra API del backend
const fetchImagesByFolder = async (slug: string): Promise<CloudinaryImage[]> => {
  // La URL ahora es más simple, solo con el slug de la categoría
  const response = await fetch(`/api/gallery/${slug}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const CollectionPage = () => {
  // Usamos useRoute para obtener los parámetros de la URL con wouter
  const [, params] = useRoute("/collections/:slug");
  const slug = params?.slug;

  const { data: images, error, isLoading } = useQuery({
    queryKey: ['collectionImages', slug],
    queryFn: () => fetchImagesByFolder(slug!),
    enabled: !!slug, // Solo ejecutar la consulta si el slug existe
  });

  useEffect(() => {
    if (isLoading) {
      console.log(`[FRONTEND] Cargando imágenes para la colección: ${slug}`);
    } else if (error) {
      console.error(`[FRONTEND] Error al cargar la colección ${slug}:`, error);
    } else {
      console.log(`[FRONTEND] Datos recibidos para la colección ${slug}. Total: ${images?.length}`);
      console.log(JSON.stringify(images, null, 2));
    }
  }, [slug, images, isLoading, error]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-light text-center mb-8"><Skeleton className="h-8 w-64 mx-auto" /></h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10">Error al cargar la colección: {error.message}</div>;
  }

  if (!images || images.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24 text-center">
        <h1 className="text-3xl font-medium tracking-luxury mb-4 capitalize">
          Colección: {slug?.replace('-', ' ')}
        </h1>
        <p className="text-gray-600">No se encontraron imágenes para esta colección.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-medium tracking-luxury text-center mb-8 capitalize">
        Colección: {slug?.replace('-', ' ')}
      </h1>
      <PhotoProvider>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images?.map((image, index) => (
            <PhotoView key={image.public_id} src={image.secure_url}>
              <img 
                src={image.secure_url} 
                alt={`Imagen ${index + 1} de la colección ${slug}`} 
                className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
              />
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>
    </div>
  );
};

export default CollectionPage;
