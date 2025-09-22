import { motion } from 'framer-motion';
import { AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

interface VideoHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  publicId: string;
}

const VideoHero = ({
  title,
  subtitle,
  description,
  buttonText,
  buttonLink = '#',
  publicId,
}: VideoHeroProps) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dyzlfyyv3',
    },
  });

  const cldVid = cld.video(publicId);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <AdvancedVideo
          cldVid={cldVid}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* Video Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div className="max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            {subtitle && (
              <motion.p 
                className="text-sm md:text-base text-white/90 font-light tracking-luxury mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {subtitle}
              </motion.p>
            )}
            
            <motion.h1 
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 tracking-wide leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              {title}
            </motion.h1>
            
            <motion.div 
              className="w-32 h-px bg-luxury-gold mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ duration: 1, delay: 1.3 }}
            />
            
            {description && (
              <motion.p 
                className="text-lg md:text-xl text-white/95 font-light tracking-luxury max-w-3xl mx-auto leading-relaxed mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                {description}
              </motion.p>
            )}

            {buttonText && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.7 }}
              >
                <motion.a
                  href={buttonLink}
                  className="inline-block border-2 border-white text-white px-12 py-4 text-sm font-medium tracking-luxury hover:bg-white hover:text-black transition-all duration-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {buttonText}
                </motion.a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-px h-16 bg-white/60 mx-auto mb-2"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <motion.div
          className="w-1 h-1 bg-white rounded-full mx-auto"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default VideoHero;