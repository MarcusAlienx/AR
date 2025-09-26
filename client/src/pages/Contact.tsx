import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Send, Instagram, Facebook } from 'lucide-react';
import TiktokIcon from '@/components/UI/icons/TiktokIcon.tsx';
import PinterestIcon from '@/components/UI/icons/PinterestIcon.tsx';

// 1. Esquema de Validación con Zod
const contactFormSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres.'),
  email: z.string().email('Por favor, introduce un email válido.'),
  phone: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos.'),
  eventType: z.string({ required_error: 'Debes seleccionar un tipo de evento.' }).min(1, 'Debes seleccionar un tipo de evento.'),
  eventDate: z.string().optional(),
  message: z.string().optional(),
  preferredContact: z.string(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  // 2. Integración de React Hook Form y useToast
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      message: '',
      preferredContact: 'phone',
    },
  });
  const { isSubmitting } = form.formState;

  const eventTypes = [
    'Vestido de Novia',
    'Vestido de Gala',
    'Vestido de Cóctel',
    'Vestido de Madrina',
    'Vestido de XV Años',
    'Ready-to-Wear',
    'Consulta General'
  ];

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      form.reset();
      toast({
        title: '¡Mensaje Enviado!',
        description: 'Nos pondremos en contacto contigo pronto.',
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: 'destructive',
        title: 'Error al enviar',
        description: 'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.',
      });
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Dirección',
      details: ['Av. Vallarta #1300, Col. Americana', 'Guadalajara, Jalisco', 'México C.P. 44100'],
      link: 'https://maps.google.com/?q=Av.+Vallarta+1300+Guadalajara'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      details: ['(33) 3826 2041', 'WhatsApp: +523331968024'],
      link: 'tel:+523338262041'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@albertorodriguez.com', 'ventasfashion@albertorodriguez.com'],
      link: 'mailto:info@albertorodriguez.com'
    },
    {
      icon: Clock,
      title: 'Horarios',
      details: ['Lunes - Viernes: 10:00 - 14:00 y 15:00 - 19:00', 'Sábado: 10:00 - 15:00', 'Domingo: Cerrado'],
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: 'Instagram',
      handle: 'albertorodriguezmoda',
      link: 'https://www.instagram.com/albertorodriguezmoda/'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      handle: 'albertorodriguez.mx',
      link: 'https://www.facebook.com/albertorodriguez.mx'
    },
    {
      icon: TiktokIcon,
      name: 'TikTok',
      handle: 'arodriguezmoda',
      link: 'https://www.tiktok.com/@arodriguezmoda'
    },
    {
      icon: PinterestIcon,
      name: 'Pinterest',
      handle: 'arodriguezmoda',
      link: 'https://es.pinterest.com/arodriguezmoda/'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contacto y Citas - Alberto Rodríguez Couture</title>
        <meta name="description" content="Agenda una cita personalizada en nuestro atelier en Guadalajara. Contáctanos para crear el vestido de tus sueños con el diseñador Alberto Rodríguez." />
      </Helmet>
      <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dyzlfyyv3/image/upload/f_auto,q_auto/v1757933446/259307_10151151540912267_997551934_o-1024x680_qnmhg0.jpg"
            alt="Contacto Alberto Rodríguez"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-luxury" style={{ fontFamily: 'var(--font-logo)' }}>
              CONTACTO
            </h1>
            <motion.div 
              className="w-32 h-px bg-luxury-gold mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <p className="text-xl text-white/95 max-w-3xl mx-auto leading-relaxed">
              Comencemos a crear el vestido de tus sueños.<br/>
              Agenda tu cita personalizada hoy mismo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Contact Form */}
            <div id="citas" className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-4xl font-light mb-8 tracking-luxury">
                  Agenda Tu Cita
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Completa el formulario y nos pondremos en contacto contigo para agendar 
                  una cita personalizada en nuestro atelier. Cada consulta incluye asesoría 
                  de diseño.
                </p>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...form.register('name')}
                        className="w-full px-4 py-3 border border-gray-300 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors duration-300"
                        placeholder="Tu nombre completo"
                      />
                      {form.formState.errors.name && <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...form.register('email')}
                        className="w-full px-4 py-3 border border-gray-300 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors duration-300"
                        placeholder="tu@email.com"
                      />
                      {form.formState.errors.email && <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...form.register('phone')}
                        className="w-full px-4 py-3 border border-gray-300 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors duration-300"
                        placeholder="(33) 1234 5678"
                      />
                      {form.formState.errors.phone && <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Evento *
                      </label>
                      <select
                        id="eventType"
                        {...form.register('eventType')}
                        className="w-full px-4 py-3 border border-gray-300 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors duration-300"
                      >
                        <option value="">Selecciona una opción</option>
                        {eventTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {form.formState.errors.eventType && <p className="text-red-500 text-sm mt-1">{form.formState.errors.eventType.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha del Evento (Aproximada)
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      {...form.register('eventDate')}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Método de Contacto Preferido
                    </label>
                    <div className="flex space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="phone"
                          {...form.register('preferredContact')}
                          className="text-luxury-gold focus:ring-luxury-gold border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Teléfono</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="email"
                          {...form.register('preferredContact')}
                          className="text-luxury-gold focus:ring-luxury-gold border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Email</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="whatsapp"
                          {...form.register('preferredContact')}
                          className="text-luxury-gold focus:ring-luxury-gold border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">WhatsApp</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje Adicional
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...form.register('message')}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors duration-300"
                      placeholder="Cuéntanos sobre tu visión, inspiración o cualquier detalle especial que quieras compartir..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-luxury-gold text-white py-4 px-8 font-medium tracking-luxury hover:bg-luxury-gold/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        ENVIANDO...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="w-5 h-5 mr-2" />
                        ENVIAR MENSAJE
                      </div>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>

            {/* Contact Info & Map */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Contact Information */}
                <div>
                  <h3 className="font-serif text-2xl font-light mb-6 tracking-luxury">
                    Información de Contacto
                  </h3>
                  
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={info.title}
                        className="flex items-start space-x-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-6 h-6 text-luxury-gold" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">{info.title}</h4>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-sm text-gray-600">
                              {info.link && idx === 0 ? (
                                <a href={info.link} className="hover:text-luxury-gold transition-colors duration-300">
                                  {detail}
                                </a>
                              ) : (
                                detail
                              )}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="font-serif text-2xl font-light mb-6 tracking-luxury">
                    Síguenos
                  </h3>
                  
                  <div className="space-y-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 p-4 bg-white hover:shadow-lg transition-all duration-300 group border border-gray-100 hover:border-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-10 h-10 bg-luxury-light rounded-full flex items-center justify-center group-hover:bg-luxury-gold transition-colors duration-300">
                          <social.icon className="w-5 h-5 text-luxury-black group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-gray-700">
                            {social.name}
                          </h4>
                          <p className="text-sm text-gray-600">{social.handle}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-luxury-light p-6 rounded-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <Calendar className="w-6 h-6 text-luxury-gold" />
                    <h3 className="font-serif text-xl font-light tracking-luxury">
                      Citas de Emergencia
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Para eventos con menos de 30 días de anticipación, contacta 
                    directamente por WhatsApp para verificar disponibilidad.
                  </p>
                  <motion.a
                    href="https://wa.me/523331968024"
                    className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm font-medium">WhatsApp Directo</span>
                    <Phone className="w-4 h-4 ml-2" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl font-light mb-4 tracking-luxury">
              Visita Nuestro Atelier
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ubicado en el corazón de Guadalajara, nuestro atelier te espera 
              para crear juntos el vestido de tus sueños.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-[16/9] bg-gray-200">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-103.376,20.670,-103.356,20.680&amp;layer=mapnik&amp;marker=20.6749688,-103.3674786"
                style={{ border: 0 }}
                allowFullScreen={true}
              ></iframe>
            </div>
          </motion.div>
          <div className="text-center mt-4">
            <a
              href="https://maps.google.com/?q=Av.+Vallarta+1300+Guadalajara"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-gray-500 hover:text-luxury-gold transition-all duration-300 transform hover:scale-110"
            >
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Contact;