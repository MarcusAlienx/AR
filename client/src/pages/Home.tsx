import { motion } from 'framer-motion';
import { Lightbulb, Clock, Award, Phone } from 'lucide-react';
import VideoHero from '@/components/UI/VideoHero';
import CollectionCard from '@/components/UI/CollectionCard';
import ServiceCard from '@/components/UI/ServiceCard';

const Home = () => {
  const collections = [
    {
      title: 'NOVIA',
      subtitle: 'COLECCIÓN ETERNA',
      image: 'https://images.unsplash.com/photo-1594736797933-d0c02e8ec2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000',
      href: '/collections#novia'
    },
    {
      title: 'XV AÑOS',
      subtitle: 'MOMENTO PRINCESA',
      image: 'https://images.unsplash.com/photo-1582639592587-6d82b83fcef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000',
      href: '/collections#xv'
    },
    {
      title: 'NOCHE',
      subtitle: 'ELEGANCIA IMPERIAL',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000',
      href: '/collections#noche'
    },
    {
      title: 'CORTOS',
      subtitle: 'SOFISTICACIÓN DORADA',
      image: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000',
      href: '/collections#cortos'
    },
  ];

  const redCarpetEvents = [
    {
      title: 'CELEBRITIES',
      subtitle: 'ESTRELLAS INTERNACIONALES',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800',
    },
    {
      title: 'CLIENTAS',
      subtitle: 'MOMENTOS ESPECIALES',
      image: 'https://images.unsplash.com/photo-1594736797933-d0c02e8ec2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800',
    },
    {
      title: 'FASHION WEEK',
      subtitle: 'PASARELAS INTERNACIONALES',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800',
    },
    {
      title: 'DESFILES',
      subtitle: 'ALTA COSTURA MEXICANA',
      image: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800',
    },
  ];

  const services = [
    {
      icon: Lightbulb,
      title: 'DISEÑO PERSONALIZADO',
      description: 'Asesoría directa del diseñador para crear piezas únicas adaptadas a cada cliente'
    },
    {
      icon: Clock,
      title: 'CITAS VIP',
      description: 'Atención exclusiva en nuestro atelier con cita previa para una experiencia personalizada'
    },
    {
      icon: Award,
      title: 'ACABADOS DE LUJO',
      description: 'Detalles exquisitos y acabados perfectos que distinguen cada creación de alta costura'
    },
  ];

  return (
    <div className="pt-20">
      {/* Video Hero Section */}
      <VideoHero
        title="ALTA COSTURA"
        subtitle="ALBERTO RODRÍGUEZ COUTURE"
        description="Más de 35 años creando momentos únicos a través del diseño de alta costura y vestidos de novia excepcionales"
        videoSrc="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69fabf212b686ebe8c87b2c96e2d37b2e&profile_id=164&oauth2_token_id=57447761"
        posterImage="https://images.unsplash.com/photo-1594736797933-d0c02e8ec2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
        buttonText="DESCUBRIR COLECCIONES"
        buttonLink="#colecciones"
        autoPlay={true}
        muted={true}
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
            {collections.map((collection, index) => (
              <CollectionCard
                key={collection.title}
                title={collection.title}
                subtitle={collection.subtitle}
                image={collection.image}
                href={collection.href}
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
              <motion.div
                key={event.title}
                className="group"
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
                </div>
                <div className="pt-4 text-center">
                  <h4 className="font-medium text-lg mb-1">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.subtitle}</p>
                </div>
              </motion.div>
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
              whileInView={{ opacity: 1, x: 0 }}
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
                  Su filosofía: "En la moda hay que evolucionar más allá de las tendencias y estilos", 
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
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Luxury fashion atelier workspace"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
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
            {services.map((service, index) => (
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
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Luxury fashion boutique interior"
                className="w-full h-96 object-cover"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
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
    </div>
  );
};

export default Home;
