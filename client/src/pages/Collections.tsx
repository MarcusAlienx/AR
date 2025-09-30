import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Star, Calendar, User } from 'lucide-react';

const Collections = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['novia', 'xv', 'noche', 'cortos', 'primavera'].includes(hash)) {
      setSelectedCategory(hash);
      setTimeout(() => {
        window.scrollTo({ top: 300, behavior: 'smooth' });
      }, 200);
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash && ['novia', 'xv', 'noche', 'cortos', 'primavera'].includes(newHash)) {
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
    { id: 'primavera', label: 'PRIMAVERA' }
  ];

  const collections = [
    {
      id: 1,
      title: 'Novias Eternas',
      description: 'Vestidos de novia únicos diseñados para el día más importante. Cada pieza es creada a medida con las mejores telas y técnicas de alta costura.',
      image: 'https://res.cloudinary.com/dyzlfyyv3/image/upload/novia145_srlpmh.jpg',
      category: 'novia',
      season: 'Colección 2025',
    },
    {
      id: 2,
      title: 'XV Años Princesa',
      description: 'Vestidos de quinceañera que marcan el paso a la feminidad. Diseños que capturan la magia de este momento único.',
      image: 'https://res.cloudinary.com/dyzlfyyv3/image/upload/f_auto,q_auto/xv090_mc1wtd.jpg',
      category: 'xv',
      season: 'Colección 2025',
    },
    {
      id: 3,
      title: 'Noche Elegante',
      description: 'Vestidos de noche para eventos especiales. Elegancia y sofisticación que capturan la esencia de la realeza con un toque moderno.',
      image: 'https://res.cloudinary.com/dyzlfyyv3/image/upload/f_auto,q_auto/v1756973312/noche_59_41f801fcdc.jpg',
      category: 'noche',
      season: 'Colección 2025',
    },
    {
      id: 4,
      title: 'Vestidos Cortos',
      description: 'Diseños sofisticados para ocasiones semi-formales. La perfecta combinación entre elegancia y versatilidad para la mujer moderna.',
      image: 'https://res.cloudinary.com/dyzlfyyv3/image/upload/f_auto,q_auto/cortos241_qmgzsn.jpg',
      category: 'cortos',
      season: 'Colección 2025',
    },
    {
      id: 5,
      title: 'Primavera Fresca',
      description: 'Colección de primavera con diseños frescos y vibrantes. Piezas que celebran la renovación y la alegría de la temporada.',
      image: 'https://res.cloudinary.com/dyzlfyyv3/image/upload/f_auto,q_auto/v1756973491/primavera_17_2ae317c57e.jpg',
      category: 'primavera',
      season: 'Colección Primavera 2025',
    }
  ];

  const filteredCollections = selectedCategory === 'all' 
    ? collections 
    : collections.filter(collection => collection.category === selectedCategory);

  const stats = [
    { icon: Star, label: 'Colecciones', value: '5' },
    { icon: User, label: 'Diseños Únicos', value: '124+' },
    { icon: Calendar, label: 'Años de Experiencia', value: '35+' },
  ];

  return (
    <>
      <Helmet>
        <title>Colecciones de Alta Costura - Alberto Rodríguez</title>
        <meta name="description" content="Explora todas las colecciones de Alberto Rodríguez: vestidos de novia, XV años, vestidos de noche, de cóctel y más. Alta costura en Guadalajara." />
      </Helmet>
      <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dyzlfyyv3/image/upload/f_auto,q_auto/v1758587478/Joyas-Eternas_m2678p.png"
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
      <section id="novia" className="py-2"></section>
      <section id="xv" className="py-2"></section>
      <section id="noche" className="py-2"></section>
      <section id="cortos" className="py-2"></section>
      <section id="primavera" className="py-2"></section>

      {/* Collections Grid */}
      <section id="collections-grid" className="py-16">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCollections.map((collection, index) => (
                <Link key={collection.id} href={`/collections/${collection.category}`}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="group cursor-pointer"
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
                                target.src = 'https://res.cloudinary.com/dyzlfyyv3/image/upload/placeholders/fashion-model-fallback';
                            }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white text-lg font-medium border-2 border-white px-6 py-3">VER GALERÍA</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-luxury-gold font-medium tracking-wide uppercase">
                                {collection.season}
                            </span>
                            </div>
                            
                            <h3 className="font-serif text-2xl font-light mb-4 tracking-luxury">
                            {collection.title.toUpperCase()}
                            </h3>
                            
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            {collection.description}
                            </p>
                        </div>
                        </div>
                    </motion.div>
                </Link>
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
            
            <Link href="/contact#citas">
              <motion.button
                className="inline-block border-2 border-luxury-gold text-luxury-gold px-12 py-4 text-sm font-medium tracking-luxury hover:bg-luxury-gold hover:text-white transition-all duration-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                AGENDAR CITA PRIVADA
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Collections;