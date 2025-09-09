import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronRight, Star, Calendar, User } from 'lucide-react';
import { useGallery } from '@/hooks/useGallery';
import { PhotoGallery } from '@/components/Gallery/PhotoGallery';
import type { Collection } from '@/types/gallery';

const Collections = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { activeGallery, isOpen, openGallery, closeGallery } = useGallery();

  useEffect(() => {
    // Detectar fragmento de URL para navegar a categoría específica
    const hash = window.location.hash.replace('#', '');
    if (hash && ['novias', 'gala', 'coctel', 'rtw'].includes(hash)) {
      setSelectedCategory(hash);
      // Scroll suave al contenido después de filtrar
      setTimeout(() => {
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }, 200);
    }

    // Listener para cambios en el hash
    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash && ['novias', 'gala', 'coctel', 'rtw'].includes(newHash)) {
        setSelectedCategory(newHash);
        setTimeout(() => {
          window.scrollTo({ top: 300, behavior: 'smooth' });
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const categories = [
    { id: 'all', label: 'TODAS LAS COLECCIONES' },
    { id: 'novia', label: 'NOVIA' },
    { id: 'xv', label: 'XV' },
    { id: 'noche', label: 'NOCHE' },
    { id: 'cortos', label: 'CORTOS' },
    { id: 'primavera', label: 'PRIMAVERA' },
    { id: 'alquiler', label: 'ALQUILER' }
  ];

  const collections = [
    {
      id: 1,
      title: 'Novias Eternas',
      description: 'Vestidos de novia únicos diseñados para el día más importante. Cada pieza es creada a medida con las mejores telas y técnicas de alta costura.',
      image: 'https://images.unsplash.com/photo-1594736797933-d0c02e8ec2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200',
      link: '/novias',
      category: 'novia',
      season: 'Colección 2025',
      pieces: 12,
      gallery: [
        {
          id: 'novia-01',
          cloudinaryId: 'collections/novia/novia_detail_01',
          title: 'Detalle de Encaje Francés',
          description: 'Trabajo artesanal de encaje importado de Francia',
          category: 'detail'
        },
        {
          id: 'novia-02',
          cloudinaryId: 'collections/novia/novia_process_01',
          title: 'Proceso de Bordado',
          description: 'Bordado a mano con perlas y cristales Swarovski',
          category: 'process'
        },
        {
          id: 'novia-03',
          cloudinaryId: 'collections/novia/novia_model_01',
          title: 'Vestido Emperatriz',
          description: 'Modelo con cola catedral y mangas de tul',
          category: 'model'
        },
        {
          id: 'novia-04',
          cloudinaryId: 'collections/novia/novia_detail_02',
          title: 'Botones de Cristal',
          description: 'Detalles de botonadura en la espalda',
          category: 'detail'
        },
        {
          id: 'novia-05',
          cloudinaryId: 'collections/novia/novia_model_02',
          title: 'Vestido Sirena Real',
          description: 'Corte sirena con detalles de pedrería',
          category: 'model'
        },
        {
          id: 'novia-06',
          cloudinaryId: 'collections/novia/novia_process_02',
          title: 'Prueba Final',
          description: 'Última prueba antes de la entrega',
          category: 'process'
        }
      ]
    },
    {
      id: 2,
      title: 'XV Años Princesa',
      description: 'Vestidos de quinceañera que marcan el paso a la feminidad. Diseños que capturan la magia de este momento único.',
      image: 'https://images.unsplash.com/photo-1582639592587-6d82b83fcef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200',
      link: '/quince',
      category: 'xv',
      season: 'Colección 2025',
      pieces: 20,
      gallery: [
        {
          id: 'xv-01',
          cloudinaryId: 'collections/xv/xv_model_01',
          title: 'Princesa de Cristal',
          description: 'Vestido con falda de tul y corset bordado',
          category: 'model'
        },
        {
          id: 'xv-02',
          cloudinaryId: 'collections/xv/xv_detail_01',
          title: 'Corona de Quinceañera',
          description: 'Corona artesanal con cristales y perlas',
          category: 'detail'
        },
        {
          id: 'xv-03',
          cloudinaryId: 'collections/xv/xv_process_01',
          title: 'Ajuste de Falda',
          description: 'Proceso de ajuste del volumen de la falda',
          category: 'process'
        },
        {
          id: 'xv-04',
          cloudinaryId: 'collections/xv/xv_model_02',
          title: 'Quinceañera Moderna',
          description: 'Diseño contemporáneo con toques clásicos',
          category: 'model'
        },
        {
          id: 'xv-05',
          cloudinaryId: 'collections/xv/xv_detail_02',
          title: 'Bordado del Corset',
          description: 'Detalles del bordado en hilo dorado',
          category: 'detail'
        }
      ]
    },
    {
      id: 3,
      title: 'Noche Elegante',
      description: 'Vestidos de noche para eventos especiales. Elegancia y sofisticación que capturan la esencia de la realeza con un toque moderno.',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200',
      link: '/noche',
      category: 'noche',
      season: 'Colección 2025',
      pieces: 18,
      gallery: [
        {
          id: 'noche-01',
          cloudinaryId: 'collections/noche/noche_model_01',
          title: 'Gala Imperial',
          description: 'Vestido largo con escote en V y cola',
          category: 'model'
        },
        {
          id: 'noche-02',
          cloudinaryId: 'collections/noche/noche_detail_01',
          title: 'Pedrería Swarovski',
          description: 'Aplicaciones de cristales en degradé',
          category: 'detail'
        },
        {
          id: 'noche-03',
          cloudinaryId: 'collections/noche/noche_event_01',
          title: 'Premio Nacional de Moda',
          description: 'Gala de premiación en Palacio de Bellas Artes',
          category: 'event'
        },
        {
          id: 'noche-04',
          cloudinaryId: 'collections/noche/noche_model_02',
          title: 'Sirena de Medianoche',
          description: 'Vestido sirena en terciopelo negro',
          category: 'model'
        }
      ]
    },
    {
      id: 4,
      title: 'Vestidos Cortos',
      description: 'Diseños sofisticados para ocasiones semi-formales. La perfecta combinación entre elegancia y versatilidad para la mujer moderna.',
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200',
      link: '/cortos',
      category: 'cortos',
      season: 'Colección 2025',
      pieces: 24,
      gallery: [
        {
          id: 'cortos-01',
          cloudinaryId: 'collections/cortos/cortos_model_01',
          title: 'Cóctel Dorado',
          description: 'Vestido corto con lentejuelas doradas',
          category: 'model'
        },
        {
          id: 'cortos-02',
          cloudinaryId: 'collections/cortos/cortos_detail_01',
          title: 'Manga de Encaje',
          description: 'Detalle de mangas en encaje francés',
          category: 'detail'
        },
        {
          id: 'cortos-03',
          cloudinaryId: 'collections/cortos/cortos_model_02',
          title: 'Graduación Elegante',
          description: 'Perfecto para ceremonias de graduación',
          category: 'model'
        }
      ]
    },
    {
      id: 5,
      title: 'Primavera Fresca',
      description: 'Colección de primavera con diseños frescos y vibrantes. Piezas que celebran la renovación y la alegría de la temporada.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200',
      link: '/primavera',
      category: 'primavera',
      season: 'Colección Primavera 2025',
      pieces: 30,
      gallery: [
        {
          id: 'primavera-01',
          cloudinaryId: 'collections/primavera/primavera_model_01',
          title: 'Jardín de Rosas',
          description: 'Vestido con estampado floral bordado',
          category: 'model'
        },
        {
          id: 'primavera-02',
          cloudinaryId: 'collections/primavera/primavera_detail_01',
          title: 'Flores de Seda',
          description: 'Aplicaciones florales hechas a mano',
          category: 'detail'
        },
        {
          id: 'primavera-03',
          cloudinaryId: 'collections/primavera/primavera_inspiration_01',
          title: 'Sketch Primaveral',
          description: 'Boceto inicial de la colección',
          category: 'inspiration'
        }
      ]
    },
    {
      id: 6,
      title: 'Alquiler Premium',
      description: 'Servicio de alquiler de vestidos de alta costura. Elegancia accesible para ocasiones especiales sin comprometer la calidad.',
      image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200',
      link: '/alquiler',
      category: 'alquiler',
      season: 'Disponible Todo el Año',
      pieces: 50,
      gallery: [
        {
          id: 'alquiler-01',
          cloudinaryId: 'collections/alquiler/alquiler_model_01',
          title: 'Gala Disponible',
          description: 'Vestido de gala disponible para alquiler',
          category: 'model'
        },
        {
          id: 'alquiler-02',
          cloudinaryId: 'collections/alquiler/alquiler_process_01',
          title: 'Proceso de Limpieza',
          description: 'Cuidado especial después de cada uso',
          category: 'process'
        },
        {
          id: 'alquiler-03',
          cloudinaryId: 'collections/alquiler/alquiler_model_02',
          title: 'Madrina Elegante',
          description: 'Perfecta para madrinas de boda',
          category: 'model'
        }
      ]
    }
  ];

  const filteredCollections = selectedCategory === 'all' 
    ? collections 
    : collections.filter(collection => collection.category === selectedCategory);

  const stats = [
    { icon: Star, label: 'Colecciones', value: '6' },
    { icon: User, label: 'Diseños Únicos', value: '124+' },
    { icon: Calendar, label: 'Años de Experiencia', value: '35+' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
            alt="Colecciones Alberto Rodríguez"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-luxury" style={{ fontFamily: 'var(--font-logo)' }}>
              COLECCIONES
            </h1>
            <motion.div 
              className="w-32 h-px bg-luxury-gold mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <p className="text-xl text-white/95 max-w-3xl mx-auto leading-relaxed">
              Cada pieza es una obra de arte que refleja la pasión por la perfección<br/>
              y el detalle que nos caracteriza desde 1986.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-luxury-light">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-light text-luxury-black mb-2">{stat.value}</h3>
                <p className="text-gray-600 tracking-luxury">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 text-sm font-medium tracking-luxury transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-luxury-gold text-white'
                    : 'bg-transparent text-luxury-black hover:bg-luxury-light border border-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Collection Sections */}
      <section id="novias" className="py-2"></section>
      <section id="gala" className="py-2"></section>
      <section id="coctel" className="py-2"></section>
      <section id="rtw" className="py-2"></section>

      {/* Collections Grid */}
      <section id="collections-grid" className="py-16">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        console.error('Collection image failed to load:', collection.image);
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-luxury-gold font-medium tracking-wide uppercase">
                        {collection.season}
                      </span>
                    </div>
                    
                    <h3 className="font-serif text-2xl font-light mb-4 tracking-luxury">
                      {collection.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {collection.description}
                    </p>
                    
                    <div className="flex justify-end">
                      <motion.button
                        onClick={() => openGallery(collection.gallery, `Galería: ${collection.title}`)}
                        className="flex items-center text-luxury-gold hover:text-luxury-black transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-sm font-medium mr-2">VER GALERÍA</span>
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-luxury-black text-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 tracking-luxury">
              ¿Te Imaginas Tu Vestido Ideal?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Agenda una cita personalizada y convierte tu visión en realidad
              con nuestro proceso de diseño exclusivo.
            </p>
            
            <motion.button
              className="inline-block border-2 border-luxury-gold text-luxury-gold px-12 py-4 text-sm font-medium tracking-luxury hover:bg-luxury-gold hover:text-black transition-all duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              AGENDAR CITA PRIVADA
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Galería de Fotos */}
      <PhotoGallery 
        images={activeGallery?.images || []}
        title={activeGallery?.title || ''}
        isOpen={isOpen}
        onClose={closeGallery}
      />
    </div>
  );
};

export default Collections;