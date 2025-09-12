
import React from 'react';
import { Helmet } from 'react-helmet-async';
import type { GalleryImage } from '@/types/gallery';

interface ImageSEOProps {
  images: GalleryImage[];
  title: string;
  description?: string;
  url?: string;
}

export const ImageSEO: React.FC<ImageSEOProps> = ({
  images,
  title,
  description = 'Galería de alta costura Alberto Rodríguez',
  url = window.location.href
}) => {
  // Usar la primera imagen como imagen principal para SEO
  const featuredImage = images[0];
  
  // Generar structured data para la galería
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: title,
    description: description,
    url: url,
    associatedMedia: images.map((image, index) => ({
      '@type': 'ImageObject',
      name: image.title,
      description: image.description,
      contentUrl: `https://res.cloudinary.com/alberto-rodriguez-couture/image/upload/c_fill,w_1200,h_900,q_auto,f_auto/${image.cloudinaryId}`,
      thumbnailUrl: `https://res.cloudinary.com/alberto-rodriguez-couture/image/upload/c_fill,w_400,h_300,q_auto,f_auto/${image.cloudinaryId}`,
      uploadDate: new Date().toISOString(),
      keywords: [image.category, 'alta costura', 'Alberto Rodríguez', 'vestidos'],
      creator: {
        '@type': 'Person',
        name: 'Alberto Rodríguez',
        url: 'https://albertorodriguez.com'
      },
      copyrightHolder: {
        '@type': 'Organization',
        name: 'Alberto Rodríguez Couture',
        url: 'https://albertorodriguez.com'
      }
    })),
    author: {
      '@type': 'Person',
      name: 'Alberto Rodríguez'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Alberto Rodríguez Couture',
      logo: {
        '@type': 'ImageObject',
        url: 'https://albertorodriguez.com/logo.png'
      }
    }
  };

  return (
    <Helmet>
      {/* Meta tags básicos */}
      <title>{title} | Alberto Rodríguez Couture</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="alta costura, vestidos de novia, quinceañera, vestidos de noche, Alberto Rodríguez, Guadalajara, México" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      {featuredImage && (
        <>
          <meta property="og:image" content={`https://res.cloudinary.com/alberto-rodriguez-couture/image/upload/c_fill,w_1200,h_630,q_auto,f_auto/${featuredImage.cloudinaryId}`} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={featuredImage.title} />
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {featuredImage && (
        <meta name="twitter:image" content={`https://res.cloudinary.com/alberto-rodriguez-couture/image/upload/c_fill,w_1200,h_630,q_auto,f_auto/${featuredImage.cloudinaryId}`} />
      )}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Preload para imágenes críticas */}
      {featuredImage && (
        <link
          rel="preload"
          as="image"
          href={`https://res.cloudinary.com/alberto-rodriguez-couture/image/upload/c_fill,w_800,h_600,q_auto,f_auto/${featuredImage.cloudinaryId}`}
        />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default ImageSEO;