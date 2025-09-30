import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Skeleton } from '@/components/UI/skeleton';
import { useEffect } from 'react';
import { fetchImagesByFolder } from '@/lib/gallery';
import { formatSlug } from '@/lib/utils';

interface CollectionPageProps {
  slug: string;
}

const CollectionPage = ({ slug }: CollectionPageProps) => {
  const formattedTitle = formatSlug(slug);

  const { data: media, error, isLoading } = useQuery({
    queryKey: ['collectionImages', slug],
    queryFn: () => fetchImagesByFolder(slug!),
    enabled: !!slug, // Solo ejecutar la consulta si el slug existe
  });

  useEffect(() => {
    if (isLoading) {
      console.log(`[FRONTEND] Cargando medios para la colección: ${slug}`);
    } else if (error) {
      console.error(`[FRONTEND] Error al cargar la colección ${slug}:`, error);
    } else {
      console.log(`[FRONTEND] Datos recibidos para la colección ${slug}. Total: ${media?.length}`);
      console.log(JSON.stringify(media, null, 2));
    }
  }, [slug, media, isLoading, error]);

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

  if (!media || media.length === 0) {
    return (
      <>
        <Helmet>
          <title>{`Colección ${formattedTitle} - Alberto Rodríguez Couture`}</title>
          <meta name="description" content={`Galería de la colección ${formattedTitle} de Alberto Rodríguez.`} />
        </Helmet>
        <div className="container mx-auto px-4 py-8 pt-24 text-center">
          <h1 className="text-3xl font-medium tracking-luxury mb-4 bg-gradient-to-r from-luxury-gold via-luxury-black to-luxury-gold bg-clip-text text-transparent drop-shadow-lg animate-pulse">
            Colección: {slug?.replace('-', ' ').toUpperCase()}
          </h1>
          <p className="text-gray-600">No se encontraron medios para esta colección.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Colección ${formattedTitle} - Alberto Rodríguez Couture`}</title>
        <meta name="description" content={`Explora la galería de la colección de alta costura ${formattedTitle} del diseñador Alberto Rodríguez.`} />
      </Helmet>
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-medium tracking-luxury text-center mb-8 bg-gradient-to-r from-luxury-gold via-luxury-black to-luxury-gold bg-clip-text text-transparent drop-shadow-lg animate-pulse">
          Colección: {slug?.replace('-', ' ').toUpperCase()}
        </h1>
      <PhotoProvider>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media?.map((item, index) => (
            item.resource_type === 'video' ? (
              <video
                key={item.public_id}
                src={item.secure_url}
                controls
                muted
                loop
                className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                poster={item.secure_url.replace('.mov', '.jpg')} // Assuming poster image exists
              >
                Tu navegador no soporta el elemento de video.
              </video>
            ) : (
              <PhotoView key={item.public_id} src={item.secure_url}>
                <img
                  src={item.secure_url}
                  alt={`Imagen ${index + 1} de la colección ${slug}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
              </PhotoView>
            )
          ))}
        </div>
      </PhotoProvider>
    </div>
    </>
  );
};

export default CollectionPage;