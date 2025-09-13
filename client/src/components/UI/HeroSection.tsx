import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage: string;
  buttonText?: string;
  buttonLink?: string;
  overlay?: boolean;
}

const HeroSection = ({
  title,
  subtitle,
  description,
  backgroundImage,
  buttonText,
  buttonLink = '#',
  overlay = true,
}: HeroSectionProps) => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Overlay */}
      {overlay && <div className="absolute inset-0 bg-black/40"></div>}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div className="max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle && (
              <p className="text-sm md:text-base text-white/80 font-light tracking-luxury mb-4">
                {subtitle}
              </p>
            )}
            
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-wide">
              {title}
            </h1>
            
            <div className="w-24 h-px bg-luxury-gold mx-auto mb-6"></div>
            
            {description && (
              <p className="text-lg md:text-xl text-white/90 font-light tracking-luxury max-w-2xl mx-auto leading-relaxed mb-12">
                {description}
              </p>
            )}

            {buttonText && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <a
                  href={buttonLink}
                  className="inline-block border border-white text-white px-8 py-3 text-sm font-medium tracking-luxury hover:bg-white hover:text-black transition-all duration-300"
                >
                  {buttonText}
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
