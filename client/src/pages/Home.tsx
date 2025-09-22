import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Lightbulb, Clock, Award } from 'lucide-react';
import VideoHero from '@/components/UI/VideoHero';
import CollectionCard from '@/components/UI/CollectionCard';
import ServiceCard from '@/components/UI/ServiceCard';
import { useGalleryState as useGallery } from '@/hooks/useGalleryState';
import { PhotoGallery } from '@/components/Gallery/PhotoGallery';
import { CloudinaryGalleryOpener } from '@/components/Gallery/CloudinaryGalleryOpener';

const Home = () => {
  const { activeGallery, isOpen, closeGallery } = useGallery();
  const [activeService, setActiveService] = useState<{ folder: string; title: string } | null>(null);

  const collections = [
    {
      title: 'NOVIA',
      subtitle: 'COLECCIÓN ETERNA',
      image: 'https://res.cloudinary.com/dyzlfyyv3/image/upload/v1756973406/novias_1_d4748af80d.jpg',
      href: '/collections#novia',
      gallery: [
        {
          id: 'home-novia-01',
          cloudinaryId: 'collections/novia/novia_model_featured',
          title: 'Vestido Emperatriz - Modelo Principal',
          description: 'Nuestro diseño más icónico con cola catedral',
          category: 'model' as const
        },
        {
          id: 'home-novia-02',
          cloudinaryId: 'collections/novia/novia_detail_featured',
          title: 'Bordado Artesanal Premium',
          description: 'Cada puntada hecha a mano con hilos dorados',
          category: 'detail' as const
        },
        {
          id: 'home-novia-03',
          cloudinaryId: 'collections/novia/novia_process_featured',
          title: 'Proceso de Creación',
          description: 'Más de 200 horas de trabajo artesanal',
          category: 'process' as const
        }
      ]
    },
    {
      title: 'XV AÑOS',
      subtitle: 'MOMENTO PRINCESA',
      image: 'https://res.cloudinary.com/dyzlfyyv3/image/upload/v1756973728/xv_3_0dca4fbaff.jpg',
      href: '/collections#xv',
      gallery: [
        {
          id: 'home-xv-01',
          cloudinaryId: 'collections/xv/xv_model_featured',
          title: 'Quinceañera de Ensueño',
          description: 'Vestido con falda voluminosa y corset bordado',
          category: 'model' as const
        },
        {
          id: 'home-xv-02',
          cloudinaryId: 'collections/xv/xv_detail_featured',
          title: 'Corona de Cristal',
          description: 'Tiara artesanal con cristales Swarovski',
          category: 'detail' as const
        }
      ]
    },
    {
      title: 'NOCHE',
      subtitle: 'ELEGANCIA IMPERIAL',
      image: 'https://res.cloudinary.com/dyzlfyyv3/image/upload/v1756973278/noche_34_9ac688fd81.jpg',
      href: '/collections#noche',
      gallery: [
        {
          id: 'home-noche-01',
          cloudinaryId: 'collections/noche/noche_model_featured',
          title: 'Gala de Medianoche',
          description: 'Vestido largo con pedrería degradé',
          category: 'model' as const
        },
        {
          id: 'home-noche-02',
          cloudinaryId: 'collections/noche/noche_event_featured',
          title: 'Red Carpet México',
          description: 'Presencia en los premios más importantes',
          category: 'event' as const
        }
      ]
    },
    {
      title: 'CORTOS',
      subtitle: 'SOFISTICACIÓN DORADA',
      image: 'https://res.cloudinary.com/dyzlfyyv3/image/upload/v1756973127/cortos_4_5514996d00.jpg',
      href: '/collections#cortos',
      gallery: [
        {
          id: 'home-cortos-01',
          cloudinaryId: 'collections/cortos/cortos_model_featured',
          title: 'Cóctel de Oro',
          description: 'Vestido corto con lentejuelas doradas',
          category: 'model' as const
        }
      ]
    },
  ];

  const redCarpetEvents = [
    {
      title: 'CELEBRITIES',
      subtitle: 'ESTRELLAS INTERNACIONALES',
      image: 'https://res.cloudinary.com/dyzlfyyv3/image/upload/v1757674868/celebrities_2_cuubqm.jpg',
      category: 'celebrities' as const,
      gallery: [
        {
          id: 'cel-01',
          cloudinaryId: 'red-carpet/celebrities/cel_event_01',
          title: 'Jacqueline Bracamontes - TVyNovelas',
          description: 'Premios TVyNovelas 2024 en vestido AR dorado',
          category: 'event'
        },
        {
          id: 'cel-02',
          cloudinaryId: 'red-carpet/celebrities/cel_event_02',
          title: 'Gala de Cine Guadalajara',
          description: 'Festival Internacional de Cine',
          category: 'event'
        },
        {
          id: 'cel-03',
          cloudinaryId: 'red-carpet/celebrities/cel_detail_01',
          title: 'Detalle del Vestido de Gala',
          description: 'Bordado con cristales Swarovski',
          category: 'detail'
        },
        {
          id: 'cel-04',
          cloudinaryId: 'red-carpet/celebrities/cel_event_03',
          title: 'Alfombra Roja Cannes',
          description: 'Presencia mexicana en el Festival de Cannes',
          category: 'event'
        },
        {
          id: 'cel-05',
          cloudinaryId: 'red-carpet/celebrities/cel_process_01',
          title: 'Preparación para la Gala',
          description: 'Últimos ajustes antes del evento',
          category: 'process'
        }
      ]
    },
    {
      title: 'CLIENTAS',
      subtitle: 'MOMENTOS ESPECIALES',
      image: 'https://res.cloudinary.com/dyzlfyyv3/image/upload/v1757675008/clientas_14_vqyciu.jpg',
      category: 'clientas' as const,
      gallery: [
        {
          id: 'cli-01',
          cloudinaryId: 'red-carpet/clientas/cli_event_01',
          title: 'Boda en Hacienda San José',
          description: 'Novia en vestido con cola catedral',
          category: 'event'
        },
        {
          id: 'cli-02',
          cloudinaryId: 'red-carpet/clientas/cli_event_02',
          title: 'XV Años en Club de Golf',
          description: 'Quinceañera en vestido rosa pálido',
          category: 'event'
        },
        {
          id: 'cli-03',
          cloudinaryId: 'red-carpet/clientas/cli_detail_01',
          title: 'Velo Bordado a Mano',
          description: 'Trabajo artesanal con hilos dorados',
          category: 'detail'
        },
        {
          id: 'cli-04',
          cloudinaryId: 'red-carpet/clientas/cli_event_03',
          title: 'Gala Benéfica Cruz Roja',
          description: 'Madrina en vestido azul marino',
          category: 'event'
        }
      ]
    },
    {
      title: 'FASHION WEEK',
      subtitle: 'PASARELAS INTERNACIONALES',
      image: 'https://res.cloudinary.com/dyzlfyyv3/image/upload/v1758580482/fashionweek_a7su8b.avif',
      category: 'fashion-week' as const,
      gallery: [
        {
          id: 'fw-01',
          cloudinaryId: 'red-carpet/fashion-week/fw_event_01',
          title: 'Mercedes-Benz Fashion Week México',
          description: 'Desfile Primavera-Verano 2025',
          category: 'event'
        },
        {
          id: 'fw-02',
          cloudinaryId: 'red-carpet/fashion-week/fw_process_01',
          title: 'Backstage Preparación',
          description: 'Modelos preparándose para el desfile',
          category: 'process'
        },
        {
          id: 'fw-03',
          cloudinaryId: 'red-carpet/fashion-week/fw_event_02',
          title: 'Pasarela Principal',
          description: 'Momento culminante del desfile',
          category: 'event'
        },
        {
          id: 'fw-04',
          cloudinaryId: 'red-carpet/fashion-week/fw_detail_01',
          title: 'Detalles de Pasarela',
          description: 'Close-up de los acabados premium',
          category: 'detail'
        }
      ]
    },
    {
      title: 'DESFILES',
      subtitle: 'ALTA COSTURA MEXICANA',
      image: 'https://res.cloudinary.com/dyzlfyyv3/image/upload/v1758581713/Alberto_Rodrguez_pasarela_bsftzo.jpg',
      category: 'desfiles' as const,
      gallery: [
        {
          id: 'des-01',
          cloudinaryId: 'red-carpet/desfiles/des_event_01',
          title: 'Desfile Aniversario 35 Años',
          description: 'Celebración en Teatro Degollado',
          category: 'event'
        },
        {
          id: 'des-02',
          cloudinaryId: 'red-carpet/desfiles/des_inspiration_01',
          title: 'Inspiración Mexicana',
          description: 'Sketches con motivos prehispánicos',
          category: 'inspiration'
        },
        {
          id: 'des-03',
          cloudinaryId: 'red-carpet/desfiles/des_event_02',
          title: 'Gala de Caridad',
          description: 'Desfile benéfico en Hospicio Cabañas',
          category: 'event'
        },
        {
          id: 'des-04',
          cloudinaryId: 'red-carpet/desfiles/des_process_01',
          title: 'Montaje del Desfile',
          description: 'Preparación de la pasarela',
          category: 'process'
        }
      ]
    },
  ];

  const services = [
    {
      icon: Lightbulb,
      title: 'DISEÑO PERSONALIZADO',
      description: 'Asesoría directa del diseñador para crear piezas únicas adaptadas a cada cliente',
      folder: 'services/design',
    },
    {
      icon: Clock,
      title: 'CITAS VIP',
      description: 'Atención exclusiva en nuestro atelier con cita previa para una experiencia personalizada',
      folder: 'services/attention',
    },
    {
      icon: Award,
      title: 'ACABADOS DE LUJO',
      description: 'Detalles exquisitos y acabados perfectos que distinguen cada creación de alta costura',
      folder: 'services/quality',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Alberto Rodríguez Couture - Alta Costura en Guadalajara</title>
        <meta name="description" content="Descubre las colecciones de alta costura y vestidos de novia del diseñador Alberto Rodríguez. Más de 35 años de experiencia en Guadalajara, México." />
      </Helmet>
      <div className="pt-20">
      {/* Video Hero Section */}
      <VideoHero
        title="ALTA COSTURA"
        subtitle="ALBERTO RODRÍGUEZ COUTURE"
        description="Más de 35 años creando momentos únicos a través del diseño de alta costura y vestidos de novia excepcionales"
        buttonText="DESCUBRIR COLECCIONES"
        buttonLink="#colecciones"
        publicId="video_hero_d2swad"
      />

      {/* Collections Section */}
      <section id="colecciones" className="py-20 bg-luxury-light">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-4 tracking-wide">
              COLECCIONES DESTACADAS
            </h2>
            <div className="w-24 h-px bg-luxury-gold mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((_collection, index) => (
              <CollectionCard
                key={_collection.title}
                title={_collection.title}
                subtitle={_collection.subtitle}
                image={_collection.image}
                href={_collection.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Red Carpet Section */}
      <section id="red-carpet" className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-4 tracking-wide">
              RED CARPET
            </h2>
            <div className="w-24 h-px bg-luxury-gold mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Celebridades y personalidades han elegido Alberto Rodríguez para sus momentos más importantes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {redCarpetEvents.map((event, index) => (
              <Link key={event.title} href={`/red-carpet/${event.category}`}>
                <motion.div
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="relative overflow-hidden bg-white">
                    <motion.img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-80 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 text-white text-center transition-opacity duration-300">
                        <p className="text-sm font-medium mb-1">Ver Galería</p>
                        <div className="w-8 h-px bg-luxury-gold mx-auto"></div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 text-center">
                    <h4 className="font-medium text-lg mb-1 group-hover:text-luxury-gold transition-colors duration-300">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.subtitle}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mundo Alberto Section */}
      <section id="mundo-alberto" className="py-20 bg-luxury-black text-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 tracking-wide">
                MUNDO ALBERTO RODRÍGUEZ
              </h2>
              <div className="w-24 h-px bg-luxury-gold mb-8"></div>
              
              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-white/90">
                  Desde 1986, Alberto Rodríguez ha sido sinónimo de elegancia y sofisticación 
                  en el mundo de la alta costura mexicana. Con más de 35 años de experiencia, 
                  cada diseño cuenta una historia única.
                </p>
                <p className="text-white/90">
                  Inspirado por los grandes maestros de la moda mundial como Chanel, Dior y 
                  Oscar de la Renta, Alberto ha desarrollado un estilo inconfundible que mezcla 
                  bases clásicas con propuestas innovadoras.
                </p>
                <p className="text-white/90">
                  Su filosofía: &quot;En la moda hay que evolucionar más allá de las tendencias y estilos&quot;, 
                  se refleja en cada pieza que sale de su atelier en Guadalajara.
                </p>
              </div>

              <div className="mt-10">
                <a
                  href="/about"
                  className="inline-block border border-luxury-gold text-luxury-gold px-8 py-3 text-sm font-medium tracking-luxury hover:bg-luxury-gold hover:text-black transition-all duration-300"
                >
                  CONOCER MÁS
                </a>
              </div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://res.cloudinary.com/dyzlfyyv3/image/upload/v1758189126/fashion-model-fallback_2_tcfnxd.jpg"
                alt="Luxury fashion atelier workspace"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              
              <img
                src="https://res.cloudinary.com/dyzlfyyv3/image/upload/v1758189202/value-exclusivity_w1sonw.jpg"
                alt="Premium fashion accessories display"
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-4 tracking-wide">
              SERVICIOS EXCLUSIVOS
            </h2>
            <div className="w-24 h-px bg-luxury-gold mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Boutique Section */}
      <section id="boutique" className="py-20 bg-luxury-light">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://res.cloudinary.com/dyzlfyyv3/image/upload/v1757933446/259307_10151151540912267_997551934_o-1024x680_qnmhg0.jpg"
                alt="Luxury fashion boutique interior"
                className="w-full h-96 object-cover"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 tracking-wide">
                BOUTIQUE GUADALAJARA
              </h2>
              <div className="w-24 h-px bg-luxury-gold mb-8"></div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2 tracking-luxury">DIRECCIÓN</h3>
                  <p className="text-gray-600">
                    Av. Vallarta #1300, Col. Americana<br />
                    (Entre Atenas y Emerson)<br />
                    C.P. 44160, Guadalajara, Jalisco, México
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-2 tracking-luxury">HORARIOS</h3>
                  <p className="text-gray-600">
                    Lunes a Viernes: 10:00 AM - 3:00 PM y 4:00 PM - 7:00 PM<br />
                    Sábados: 10:00 AM - 3:00 PM<br />
                    <span className="text-luxury-gold">Atención con cita previa</span>
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-2 tracking-luxury">CONTACTO</h3>
                  <p className="text-gray-600">
                    Teléfono: (33) 3826 2041<br />
                    WhatsApp: 33 31 96 80 24
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <a
                  href="tel:+523338262041"
                  className="inline-block bg-luxury-gold text-white px-8 py-3 text-sm font-medium tracking-luxury hover:bg-luxury-gray transition-all duration-300 mr-4"
                >
                  LLAMAR AHORA
                </a>
                <a
                  href="/contacto"
                  className="inline-block border border-luxury-gray text-luxury-gray px-8 py-3 text-sm font-medium tracking-luxury hover:bg-luxury-gray hover:text-white transition-all duration-300"
                >
                  AGENDAR CITA
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-luxury-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-4 tracking-wide">
              NEWSLETTER EXCLUSIVO
            </h2>
            <div className="w-24 h-px bg-luxury-gold mx-auto mb-6"></div>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Sé el primero en conocer nuestras nuevas colecciones, eventos exclusivos 
              y tendencias de alta costura
            </p>
            
            <form className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-4 py-3 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                />
                <button
                  type="submit"
                  className="bg-luxury-gold text-black px-6 py-3 font-medium tracking-luxury hover:bg-white transition-colors duration-300"
                >
                  SUSCRIBIRSE
                </button>
              </div>
            </form>
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

      {/* Galería dinámica para servicios */}
      {activeService && (
        <CloudinaryGalleryOpener
          folderName={activeService.folder}
          galleryTitle={`Servicio: ${activeService.title}`}
          onClose={() => setActiveService(null)}
        />
      )}
    </div>
    </>
  );
};

export default Home;;