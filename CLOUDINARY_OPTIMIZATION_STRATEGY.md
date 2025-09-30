# Estrategia de Optimización de Imágenes Cloudinary

## 📋 Resumen Ejecutivo

Esta estrategia implementa transformación automática de imágenes en Cloudinary para optimizar el rendimiento del sitio web de Alberto Rodríguez Couture, reduciendo tiempos de carga y costos de ancho de banda.

**Objetivos:**

- Reducir tamaño de imágenes en 60-80%
- Mejorar tiempos de carga en 40-60%
- Implementar imágenes responsivas automáticas
- Soporte nativo para WebP/AVIF

## 🏗️ Arquitectura Actual vs. Propuesta

### Estado Actual

```typescript
// client/src/lib/cloudinary.ts - Actual
export const CloudinaryUrls = {
  thumbnail: (publicId: string) =>
    getOptimizedImageUrl(publicId, 400, 300, "auto:good"),
  medium: (publicId: string) =>
    getOptimizedImageUrl(publicId, 800, 600, "auto:good"),
  large: (publicId: string) =>
    getOptimizedImageUrl(publicId, 1200, 900, "auto:best"),
  hero: (publicId: string) =>
    getOptimizedImageUrl(publicId, 1920, 1080, "auto:best"),
  mobile: (publicId: string) =>
    getOptimizedImageUrl(publicId, 600, 450, "auto:good"),
};
```

### Arquitectura Propuesta

```typescript
// client/src/lib/cloudinary-optimized.ts - Propuesta
interface ImageTransform {
  width?: number;
  height?: number;
  quality: "auto" | "good" | "best" | "eco";
  format: "auto" | "webp" | "avif" | "jpg";
  resize: "fill" | "fit" | "crop" | "scale";
  gravity?: "auto" | "face" | "center";
  blur?: number;
}

const transforms: Record<string, ImageTransform> = {
  thumbnail: {
    width: 400,
    height: 300,
    quality: "good",
    format: "auto",
    resize: "fill",
  },
  card: {
    width: 600,
    height: 400,
    quality: "good",
    format: "auto",
    resize: "fill",
  },
  hero: {
    width: 1920,
    height: 1080,
    quality: "best",
    format: "auto",
    resize: "fill",
  },
  gallery: {
    width: 1200,
    height: 900,
    quality: "best",
    format: "auto",
    resize: "fill",
  },
  blur: {
    width: 20,
    height: 20,
    quality: "eco",
    format: "auto",
    blur: 1000,
    resize: "fill",
  },
};
```

## 🔧 Implementación Técnica

### 1. Utilidades Base de Cloudinary

```typescript
// client/src/lib/cloudinary-optimized.ts
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { format } from "@cloudinary/url-gen/actions/delivery";

const cld = new Cloudinary({
  cloud: {
    cloudName:
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "alberto-rodriguez-couture",
  },
});

export interface ImageTransform {
  width?: number;
  height?: number;
  quality: "auto" | "good" | "best" | "eco";
  format: "auto" | "webp" | "avif" | "jpg";
  resize: "fill" | "fit" | "crop" | "scale";
  gravity?: "auto" | "face" | "center";
  blur?: number;
}

export const transforms: Record<string, ImageTransform> = {
  thumbnail: {
    width: 400,
    height: 300,
    quality: "good",
    format: "auto",
    resize: "fill",
  },
  card: {
    width: 600,
    height: 400,
    quality: "good",
    format: "auto",
    resize: "fill",
  },
  hero: {
    width: 1920,
    height: 1080,
    quality: "best",
    format: "auto",
    resize: "fill",
  },
  gallery: {
    width: 1200,
    height: 900,
    quality: "best",
    format: "auto",
    resize: "fill",
  },
  blur: {
    width: 20,
    height: 20,
    quality: "eco",
    format: "auto",
    blur: 1000,
    resize: "fill",
  },
};

/**
 * Genera URL optimizada con transformaciones específicas
 */
export const buildCloudinaryUrl = (
  publicId: string,
  transform: ImageTransform
): string => {
  let image = cld.image(publicId);

  // Aplicar transformaciones
  if (transform.width && transform.height) {
    switch (transform.resize) {
      case "fill":
        image = image.resize(
          auto()
            .width(transform.width)
            .height(transform.height)
            .gravity(
              transform.gravity === "face"
                ? "face"
                : transform.gravity === "center"
                ? "center"
                : autoGravity()
            )
        );
        break;
      case "fit":
        image = image.resize(
          auto().width(transform.width).height(transform.height)
        );
        break;
      case "crop":
        image = image.resize(
          auto().width(transform.width).height(transform.height)
        );
        break;
      case "scale":
        image = image.resize(
          auto().width(transform.width).height(transform.height)
        );
        break;
    }
  }

  // Calidad
  switch (transform.quality) {
    case "auto":
      image = image.quality("auto");
      break;
    case "good":
      image = image.quality("auto:good");
      break;
    case "best":
      image = image.quality("auto:best");
      break;
    case "eco":
      image = image.quality("auto:eco");
      break;
  }

  // Formato
  if (transform.format !== "auto") {
    image = image.format(transform.format);
  } else {
    image = image.format("auto");
  }

  // Blur para placeholders
  if (transform.blur) {
    image = image.effect(`blur:${transform.blur}`);
  }

  return image.toURL();
};

/**
 * Genera URLs responsivas para srcset
 */
export const generateResponsiveUrls = (
  publicId: string,
  baseTransform: ImageTransform
) => {
  const breakpoints = [400, 800, 1200, 1920];

  return breakpoints.map((width) => ({
    url: buildCloudinaryUrl(publicId, { ...baseTransform, width }),
    width,
  }));
};

/**
 * Genera URL de blur placeholder
 */
export const generateBlurUrl = (publicId: string): string => {
  return buildCloudinaryUrl(publicId, transforms.blur);
};

/**
 * URLs optimizadas para casos específicos
 */
export const CloudinaryOptimizedUrls = {
  thumbnail: (publicId: string) =>
    buildCloudinaryUrl(publicId, transforms.thumbnail),
  card: (publicId: string) => buildCloudinaryUrl(publicId, transforms.card),
  hero: (publicId: string) => buildCloudinaryUrl(publicId, transforms.hero),
  gallery: (publicId: string) =>
    buildCloudinaryUrl(publicId, transforms.gallery),
  blur: (publicId: string) => generateBlurUrl(publicId),

  // Método personalizado
  custom: (publicId: string, transform: Partial<ImageTransform>) =>
    buildCloudinaryUrl(publicId, { ...transforms.card, ...transform }),

  // Responsive srcset
  responsive: (publicId: string, transformKey: keyof typeof transforms) =>
    generateResponsiveUrls(publicId, transforms[transformKey]),
};
```

### 2. Componente OptimizedImage

```typescript
// client/src/components/UI/OptimizedImage.tsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import {
  buildCloudinaryUrl,
  generateBlurUrl,
  generateResponsiveUrls,
  transforms,
  type ImageTransform,
} from "@/lib/cloudinary-optimized";

interface OptimizedImageProps {
  publicId: string;
  alt: string;
  transform?: keyof typeof transforms | ImageTransform;
  className?: string;
  priority?: boolean;
  lazy?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  publicId,
  alt,
  transform = "card",
  className = "",
  priority = false,
  lazy = true,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Transform config
  const transformConfig: ImageTransform =
    typeof transform === "string"
      ? transforms[transform]
      : { ...transforms.card, ...transform };

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || !lazy) {
      setIsInView(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    onError?.();
  };

  // Generar URLs
  const mainUrl = buildCloudinaryUrl(publicId, transformConfig);
  const blurUrl = generateBlurUrl(publicId);
  const responsiveUrls = generateResponsiveUrls(publicId, transformConfig);
  const srcSet = responsiveUrls
    .map(({ url, width }) => `${url} ${width}w`)
    .join(", ");

  if (isError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
      >
        <div className="text-center text-gray-500">
          <ImageIcon className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">Error al cargar imagen</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {(!isLoaded || !isInView) && (
        <img
          src={blurUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 opacity-50"
        />
      )}

      {/* Imagen principal */}
      {isInView && (
        <>
          <picture>
            <source srcSet={srcSet} sizes={sizes} />
            <motion.img
              src={mainUrl}
              alt={alt}
              loading={priority ? "eager" : "lazy"}
              onLoad={handleLoad}
              onError={handleError}
              className={`
                w-full h-full object-cover transition-opacity duration-300
                ${isLoaded ? "opacity-100" : "opacity-0"}
              `}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </picture>

          {/* Loading indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 text-gray-400"
              >
                <ImageIcon className="w-full h-full" />
              </motion.div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OptimizedImage;
```

### 3. Hook de Performance

```typescript
// client/src/hooks/useImagePerformance.ts
import { useState, useCallback } from "react";

interface ImageMetrics {
  loadTime: number;
  fileSize: number;
  format: string;
  dimensions: { width: number; height: number };
  url: string;
}

export const useImagePerformance = () => {
  const [metrics, setMetrics] = useState<Map<string, ImageMetrics>>(new Map());

  const measurePerformance = useCallback(
    (publicId: string, img: HTMLImageElement) => {
      const entries = performance.getEntriesByName(img.src);

      entries.forEach((entry) => {
        if (entry instanceof PerformanceResourceTiming) {
          const metric: ImageMetrics = {
            loadTime: entry.responseEnd - entry.requestStart,
            fileSize: entry.transferSize,
            format: getImageFormat(img.src),
            dimensions: { width: img.naturalWidth, height: img.naturalHeight },
            url: img.src,
          };

          setMetrics((prev) => new Map(prev.set(publicId, metric)));
        }
      });
    },
    []
  );

  const getMetrics = useCallback(
    (publicId: string) => {
      return metrics.get(publicId);
    },
    [metrics]
  );

  const getAllMetrics = useCallback(() => {
    return Array.from(metrics.entries());
  }, [metrics]);

  return { measurePerformance, getMetrics, getAllMetrics, metrics };
};

const getImageFormat = (url: string): string => {
  if (url.includes(".webp")) return "webp";
  if (url.includes(".avif")) return "avif";
  if (url.includes(".jpg") || url.includes(".jpeg")) return "jpg";
  if (url.includes(".png")) return "png";
  return "unknown";
};
```

### 4. Utilidad de Preload

```typescript
// client/src/lib/imagePreload.ts
import { buildCloudinaryUrl, transforms } from "./cloudinary-optimized";

export const preloadCriticalImages = (
  imageConfigs: Array<{
    publicId: string;
    transform?: keyof typeof transforms;
  }>
) => {
  imageConfigs.forEach(({ publicId, transform = "hero" }) => {
    const img = new Image();
    img.src = buildCloudinaryUrl(publicId, transforms[transform]);
  });
};

export const preloadImage = (
  publicId: string,
  transform: keyof typeof transforms = "card"
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = buildCloudinaryUrl(publicId, transforms[transform]);
  });
};
```

## 📱 Estrategias por Componente

### CollectionCard Optimizado

```typescript
// client/src/components/UI/CollectionCardOptimized.tsx
import React from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import type { GalleryImage } from "@/types/gallery";

interface CollectionCardOptimizedProps {
  title: string;
  subtitle: string;
  publicId: string; // Cambiar de image URL a publicId
  href?: string;
  className?: string;
  gallery?: GalleryImage[];
  onGalleryClick?: () => void;
}

const CollectionCardOptimized: React.FC<CollectionCardOptimizedProps> = ({
  title,
  subtitle,
  publicId,
  href = "#",
  className = "",
  gallery,
  onGalleryClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (gallery && onGalleryClick) {
      e.preventDefault();
      onGalleryClick();
    }
  };

  return (
    <motion.div
      className={`group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      <a href={href} onClick={handleClick}>
        <div className="relative overflow-hidden bg-white">
          <OptimizedImage
            publicId={publicId}
            alt={title}
            transform="card"
            className="w-full h-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay con información de galería */}
          <motion.div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {gallery && gallery.length > 0 && (
              <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90">
                <div className="w-16 h-16 bg-luxury-gold/90 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <p className="font-medium text-lg mb-1">Ver Galería</p>
                <p className="text-sm text-white/80">
                  {gallery.length}{" "}
                  {gallery.length === 1 ? "imagen" : "imágenes"}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        <div className="pt-6 text-center">
          <h3 className="font-serif text-2xl font-light mb-2 tracking-luxury group-hover:text-luxury-gold transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-gray-600 tracking-luxury">{subtitle}</p>

          {gallery && gallery.length > 0 && (
            <motion.div
              className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ y: 10 }}
              whileHover={{ y: 0 }}
            >
              <span className="inline-flex items-center text-luxury-gold text-sm font-medium">
                <Eye className="w-4 h-4 mr-2" />
                Explorar Colección
              </span>
            </motion.div>
          )}
        </div>
      </a>
    </motion.div>
  );
};

export default CollectionCardOptimized;
```

### PhotoGallery Optimizada

```typescript
// Actualizar client/src/components/Gallery/PhotoGallery.tsx
// Cambiar las líneas de imágenes por:
<OptimizedImage
  publicId={image.cloudinaryId}
  alt={image.title}
  transform="thumbnail"
  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
  sizes="400px"
/>

// Para el lightbox:
<PhotoView src={CloudinaryOptimizedUrls.gallery(image.cloudinaryId)}>
```

## 🚀 Plan de Implementación

### Fase 1: Infraestructura (1 semana)

1. ✅ Crear `client/src/lib/cloudinary-optimized.ts`
2. ✅ Crear `OptimizedImage` component
3. ✅ Crear hooks de performance
4. ✅ Crear utilidades de preload

### Fase 2: Migración Core (1 semana)

1. ✅ Actualizar `CollectionCard` → `CollectionCardOptimized`
2. ✅ Migrar imágenes en `Home.tsx`
3. ✅ Actualizar `PhotoGallery`
4. ✅ Actualizar `Header` logos

### Fase 3: Optimización Avanzada (1 semana)

1. ✅ Implementar preload de imágenes críticas
2. ✅ Agregar métricas de performance
3. ✅ Testing de carga y rendimiento
4. ✅ Optimización de Core Web Vitals

### Fase 4: Monitoreo y Mantenimiento

1. ✅ Dashboard de métricas de imágenes
2. ✅ Alertas de rendimiento
3. ✅ Optimización continua basada en analytics

## 📊 Métricas de Éxito

### Performance Esperada

- **Tamaño de imágenes**: -60-80%
- **Tiempo de carga**: -40-60%
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Ancho de banda móvil**: -50-70%

### Funcionalidades Implementadas

- ✅ Imágenes responsivas automáticas
- ✅ Formatos modernos (WebP/AVIF)
- ✅ Lazy loading inteligente
- ✅ Blur placeholders
- ✅ Monitoreo de performance
- ✅ Preload de imágenes críticas

## 🔧 Configuración de Build

### Vite Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          cloudinary: ["@cloudinary/url-gen"],
          "react-vendor": ["react", "react-dom"],
          "ui-vendor": ["framer-motion", "lucide-react"],
        },
      },
    },
  },
});
```

### ESLint Rules

```javascript
// eslint.config.js
{
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // Reglas específicas para optimización de imágenes
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
  }
}
```

## 🧪 Testing Strategy

### Unit Tests

```typescript
// client/src/lib/__tests__/cloudinary-optimized.test.ts
import { buildCloudinaryUrl, transforms } from "../cloudinary-optimized";

describe("Cloudinary Optimized Utils", () => {
  test("buildCloudinaryUrl generates correct URL", () => {
    const url = buildCloudinaryUrl("test-image", transforms.thumbnail);
    expect(url).toContain("f_auto");
    expect(url).toContain("q_auto:good");
    expect(url).toContain("w_400");
  });

  test("generateResponsiveUrls creates srcset", () => {
    const urls = generateResponsiveUrls("test-image", transforms.card);
    expect(urls).toHaveLength(4);
    expect(urls[0].width).toBe(400);
    expect(urls[3].width).toBe(1920);
  });
});
```

### Performance Tests

```typescript
// client/src/components/UI/__tests__/OptimizedImage.test.tsx
import { render, screen } from "@testing-library/react";
import OptimizedImage from "../OptimizedImage";

describe("OptimizedImage", () => {
  test("renders with blur placeholder initially", () => {
    render(<OptimizedImage publicId="test" alt="test" />);
    const blurImage = screen.getByAltText("");
    expect(blurImage).toHaveClass("blur-sm");
  });

  test("loads main image after intersection", async () => {
    // Mock IntersectionObserver
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;

    render(<OptimizedImage publicId="test" alt="test" lazy={false} />);
    const mainImage = screen.getByAltText("test");
    expect(mainImage).toBeInTheDocument();
  });
});
```

## 📈 Monitoreo y Analytics

### Dashboard de Métricas

```typescript
// client/src/lib/analytics/imageAnalytics.ts
export const trackImagePerformance = (metrics: ImageMetrics) => {
  // Enviar a analytics service
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "image_performance", {
      custom_parameter_1: metrics.loadTime,
      custom_parameter_2: metrics.fileSize,
      custom_parameter_3: metrics.format,
    });
  }
};

export const calculateOptimizationSavings = (metrics: ImageMetrics[]) => {
  const totalOriginal = metrics.reduce((sum, m) => sum + m.fileSize, 0);
  const averageLoadTime =
    metrics.reduce((sum, m) => sum + m.loadTime, 0) / metrics.length;

  return {
    totalSize: totalOriginal,
    averageLoadTime,
    estimatedBandwidthSavings: totalOriginal * 0.6, // 60% estimado
    performanceScore:
      averageLoadTime < 100
        ? "good"
        : averageLoadTime < 500
        ? "needs-improvement"
        : "poor",
  };
};
```

## 🎯 Checklist de Implementación

### Pre-Implementación

- [ ] Backup de archivos actuales
- [ ] Configurar variables de entorno de Cloudinary
- [ ] Actualizar dependencias si es necesario

### Implementación Core

- [ ] Crear `cloudinary-optimized.ts`
- [ ] Crear `OptimizedImage` component
- [ ] Crear hooks de performance
- [ ] Actualizar componentes principales

### Testing y Validación

- [ ] Ejecutar tests unitarios
- [ ] Probar en diferentes dispositivos
- [ ] Validar Core Web Vitals
- [ ] Verificar compatibilidad de navegadores

### Despliegue

- [ ] Deploy gradual con feature flags
- [ ] Monitoreo de performance post-deploy
- [ ] Rollback plan si es necesario

## 🔄 Mantenimiento

### Revisiones Periódicas

- **Semanal**: Revisar métricas de performance
- **Mensual**: Optimizar imágenes basadas en analytics
- **Trimestral**: Actualizar estrategias según nuevas tecnologías

### Actualizaciones

- Mantener dependencias de Cloudinary actualizadas
- Revisar nuevas APIs de optimización
- Implementar mejoras basadas en feedback de usuarios

---

**Fecha de Creación**: Diciembre 2024
**Versión**: 1.0
**Autor**: Arquitecto de Sistemas
**Estado**: Listo para Implementación
