import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Award, Heart, Users, Clock, Sparkles, MapPin } from 'lucide-react';
import { getOptimizedImageUrl } from '@/lib/cloudinary';

const About = () => {
  const milestones = [
    {
      year: '1986',
      title: 'Fundación',
      description: 'Alberto Rodríguez inicia su trayectoria en la alta costura en Guadalajara, Jalisco.'
    },
    {
      year: '1995',
      title: 'Reconocimiento Nacional',
      description: 'Primer desfile en Fashion Week Mexico City, consolidando su presencia nacional.'
    },
    {
      year: '2005',
      title: 'Expansión Internacional',
      description: 'Participación en Miami Fashion Week y primeras clientas internacionales.'
    },
    {
      year: '2015',
      title: 'Atelier Flagship',
      description: 'Apertura del atelier insignia en Av. Vallarta, el corazón de la marca.'
    },
    {
      year: '2025',
      title: 'Legado Continuo',
      description: 'Celebrando 39 años de excelencia en alta costura y vestidos de novia.'
    }
  ];

  const values = [
    {
      icon: Award,
      title: 'Artesanía Excepcional',
      description: 'Cada vestido es una obra de arte, cosida a mano con técnicas de alta costura.',
      image: 'https://res.cloudinary.com/dyzlfyyv3/image/upload/pages/about/value-craftsmanship'
    },
    {
      icon: Sparkles,
      title: 'Exclusividad Garantizada',
      description: 'Diseños únicos y personalizados que aseguran que no habrá otro igual.',
      image: 'https://res.cloudinary.com/dyzlfyyv3/image/upload/pages/about/value-exclusivity'
    },
    {
      icon: Heart,
      title: 'Atelier Privado',
      description: 'Una experiencia de lujo y personalizada en nuestro exclusivo atelier en Guadalajara.',
      image: 'https://res.cloudinary.com/dyzlfyyv3/image/upload/pages/about/value-atelier'
    },
    {
      icon: Users,
      title: 'Materiales de Primera',
      description: 'Seleccionamos solo las telas y materiales más finos de todo el mundo.',
      image: 'https://res.cloudinary.com/dyzlfyyv3/image/upload/pages/about/value-materials'
    }
  ];

  const stats = [
    { number: '2,500+', label: 'Novias Vestidas' },
    { number: '35+', label: 'Años de Experiencia' },
    { number: '15', label: 'Artesanos Especializados' },
    { number: '100%', label: 'Hecho a Medida' }
  ];

  return (
    <>
      <Helmet>
        <title>Nuestra Historia - Alberto Rodríguez Couture</title>
        <meta name="description" content="Conoce la historia y filosofía de Alberto Rodríguez, diseñador de alta costura en Guadalajara con más de 35 años de experiencia creando vestidos de novia y gala." />
      </Helmet>
      <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dyzlfyyv3/image/upload/v1758189126/alberto_rodriguez_nk5gsz.jpg"
            alt="Alberto Rodríguez"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-luxury" style={{ fontFamily: 'var(--font-logo)' }}>
              ALBERTO RODRÍGUEZ
            </h1>
            <motion.div 
              className="w-32 h-px bg-luxury-gold mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <p className="text-xl text-white/95 max-w-3xl mx-auto leading-relaxed">
              Más de tres décadas dedicadas a crear momentos únicos<br/>
              a través del arte de la alta costura
            </p>
          </motion.div>
        </div>
      </section>

      {/* Biography Section */}
      <section id="historia" className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 tracking-luxury">
                Una Historia de Elegancia
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Desde 1986, Alberto Rodríguez ha sido sinónimo de elegancia y sofisticación 
                  en el mundo de la alta costura mexicana. Su pasión por crear vestidos únicos 
                  nació de una profunda admiración por la belleza femenina y el deseo de hacer 
                  realidad los sueños de cada mujer.
                </p>
                <p className="text-lg">
                  Formado en las mejores escuelas de diseño y con experiencia en casas de alta 
                  costura europeas, Alberto regresó a México con una visión clara: crear piezas 
                  que fusionaran la elegancia internacional con la calidez y tradición mexicana.
                </p>
                <p className="text-lg">
                  Cada vestido que sale de nuestro atelier es el resultado de un proceso artesanal 
                  meticuloso, donde la calidad de los materiales, la precisión en el corte y la 
                  atención al detalle son fundamentales para lograr la perfección que nos caracteriza.
                </p>
              </div>
              
              <div className="mt-12 flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-luxury-gold">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">Guadalajara, Jalisco</span>
                </div>
                <div className="flex items-center space-x-2 text-luxury-gold">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium">Desde 1986</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dyzlfyyv3/image/upload/albertorodriguez_lysomc.png"
                  alt="Alberto Rodríguez"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-luxury-gold/10 rounded-full"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-luxury-light rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-luxury-light">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <h3 className="text-3xl md:text-4xl font-light text-luxury-black mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 text-sm tracking-luxury uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 tracking-luxury">
              Nuestros Valores
            </h2>
            <div className="w-32 h-px bg-luxury-gold mx-auto mb-8" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Los principios que guían cada una de nuestras creaciones y definen
              la experiencia Alberto Rodríguez Couture
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-light mb-4 tracking-luxury">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-luxury-black text-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 tracking-luxury">
              Nuestra Historia
            </h2>
            <div className="w-32 h-px bg-luxury-gold mx-auto mb-8" />
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Momentos clave que han marcado nuestro camino hacia la excelencia
              en la alta costura
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-luxury-gold/30"></div>
            
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className={`w-full max-w-md ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                      <h3 className="text-2xl font-light text-luxury-gold mb-2">
                        {milestone.year}
                      </h3>
                      <h4 className="font-serif text-xl mb-3">
                        {milestone.title}
                      </h4>
                      <p className="text-white/80 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-luxury-gold rounded-full border-4 border-luxury-black"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Atelier Section */}
      <section id="atelier" className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dyzlfyyv3/image/upload/v1758189126/fashion-model-fallback_pezpft.jpg"
                    alt="Atelier Interior"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dyzlfyyv3/image/upload/v1758189175/value-atelier_rswhpl.jpg"
                    alt="Design Process"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dyzlfyyv3/image/upload/v1758189202/value-materials_f1ucgm.jpg"
                    alt="Fabric Selection"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dyzlfyyv3/image/upload/v1758189175/value-craftsmanship.jpg"
                    alt="Final Details"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 tracking-luxury">
                Nuestro Atelier
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  En el corazón de Guadalajara, nuestro atelier es un espacio donde la magia 
                  de la alta costura cobra vida. Cada rincón está diseñado para inspirar 
                  creatividad y facilitar el proceso artesanal que caracteriza nuestro trabajo.
                </p>
                <p className="text-lg">
                  Contamos con las mejores telas importadas de Europa, herramientas de precisión 
                  y un equipo de artesanos especializados que dominan técnicas tradicionales 
                  transmitidas de generación en generación.
                </p>
                <p className="text-lg">
                  La experiencia en nuestro atelier va más allá de una simple prueba de vestido. 
                  Es un momento íntimo donde cada clienta descubre cómo sus sueños toman forma 
                  a través de nuestras manos expertas.
                </p>
              </div>
              
              <Link href="/contact#citas">
                <motion.button
                  className="mt-8 inline-block border-2 border-luxury-gold text-luxury-gold px-8 py-3 text-sm font-medium tracking-luxury hover:bg-luxury-gold hover:text-white transition-all duration-500 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  VISITAR NUESTRO ATELIER
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;