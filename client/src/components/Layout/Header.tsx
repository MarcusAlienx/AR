import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Facebook, Phone } from 'lucide-react';

const Header = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const navigationItems = [
    { href: '/', label: 'INICIO' },
    { href: '/collections', label: 'COLECCIONES' },
    { href: '/about', label: 'ACERCA DE' },
    { href: '/contact', label: 'CONTACTO' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = () => {
    closeMenu();
  };

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/98 backdrop-blur-md shadow-lg border-b border-gray-100' 
            : 'bg-white/90 backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <nav className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 relative">
            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden relative z-50 p-2 hover:bg-gray-50/80 rounded-full transition-all duration-300"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                className="w-6 h-6 relative"
              >
                <motion.span
                  className="absolute block h-0.5 w-6 bg-luxury-black transform transition-all duration-300"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 }
                  }}
                  style={{ top: '6px' }}
                />
                <motion.span
                  className="absolute block h-0.5 w-6 bg-luxury-black transform transition-all duration-300"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  style={{ top: '12px' }}
                />
                <motion.span
                  className="absolute block h-0.5 w-6 bg-luxury-black transform transition-all duration-300"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 }
                  }}
                  style={{ top: '18px' }}
                />
              </motion.div>
            </motion.button>

            {/* Desktop Navigation Left */}
            <div className="hidden lg:flex items-center space-x-10">
              {navigationItems.slice(0, 2).map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link href={item.href}>
                    <motion.div
                      className={`text-sm font-medium tracking-luxury relative cursor-pointer block ${
                        location === item.href
                          ? 'text-luxury-gold'
                          : 'text-luxury-black hover:text-luxury-gold'
                      } transition-colors duration-300`}
                      whileHover={{ y: -2 }}
                    >
                      {item.label}
                      {location === item.href && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-luxury-gold"
                          layoutId="underline"
                        />
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Center Logo */}
            <motion.div 
              className="flex-1 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Link href="/">
                <motion.div 
                  className="flex items-center cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="text-2xl font-light tracking-luxury text-luxury-black" style={{ fontFamily: 'var(--font-logo)' }}>
                    ALBERTO RODRÍGUEZ
                  </span>
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation Right */}
            <div className="hidden lg:flex items-center space-x-10">
              {navigationItems.slice(2).map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 2) * 0.1 + 0.3 }}
                >
                  <Link href={item.href}>
                    <motion.div
                      className={`text-sm font-medium tracking-luxury relative cursor-pointer block ${
                        location === item.href
                          ? 'text-luxury-gold'
                          : 'text-luxury-black hover:text-luxury-gold'
                      } transition-colors duration-300`}
                      whileHover={{ y: -2 }}
                    >
                      {item.label}
                      {location === item.href && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-luxury-gold"
                          layoutId="underline"
                        />
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right spacer for centering */}
            <div className="hidden lg:block w-20"></div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Menu Content */}
            <motion.div
              className="absolute top-0 left-0 w-80 h-full bg-white shadow-2xl"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
            >
              <div className="pt-24 pb-8 px-8">
                {/* Logo in mobile menu */}
                <motion.div 
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-xl font-light tracking-luxury text-luxury-black" style={{ fontFamily: 'var(--font-logo)' }}>
                    ALBERTO RODRÍGUEZ
                  </span>
                  <div className="w-16 h-px bg-luxury-gold mt-2" />
                </motion.div>

                {/* Navigation Links */}
                <div className="space-y-6 mb-12">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index + 0.3 }}
                    >
                      <Link href={item.href}>
                        <motion.div
                          className={`text-lg font-medium tracking-luxury cursor-pointer py-2 ${
                            location === item.href
                              ? 'text-luxury-gold'
                              : 'text-luxury-black hover:text-luxury-gold'
                          } transition-colors duration-300`}
                          onClick={handleNavClick}
                          whileHover={{ x: 10 }}
                        >
                          {item.label}
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Collection Categories */}
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-sm text-luxury-gold mb-4 tracking-luxury uppercase">
                    COLECCIONES
                  </div>
                  <div className="space-y-3">
                    {[
                      { href: '/collections#novia', label: 'NOVIA' },
                      { href: '/collections#xv', label: 'XV AÑOS' },
                      { href: '/collections#noche', label: 'NOCHE' },
                      { href: '/collections#cortos', label: 'CORTOS' },
                      { href: '/collections#primavera', label: 'PRIMAVERA' },
                      { href: '/collections#alquiler', label: 'ALQUILER' }
                    ].map((category, index) => (
                      <motion.div
                        key={category.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <a href={category.href}>
                          <motion.div
                            className="text-sm text-gray-600 hover:text-luxury-gold cursor-pointer py-1 transition-colors duration-300"
                            onClick={closeMenu}
                            whileHover={{ x: 5 }}
                          >
                            {category.label}
                          </motion.div>
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-sm text-gray-600">
                    <div className="mb-2">Av. Vallarta #1300</div>
                    <div className="mb-2">Guadalajara, Jalisco</div>
                    <div className="mb-4">(33) 3826 2041</div>
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-4">
                    <motion.a
                      href="#"
                      className="w-10 h-10 bg-luxury-light rounded-full flex items-center justify-center hover:bg-luxury-gold hover:text-white transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Instagram className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-10 h-10 bg-luxury-light rounded-full flex items-center justify-center hover:bg-luxury-gold hover:text-white transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Facebook className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href="tel:+523338262041"
                      className="w-10 h-10 bg-luxury-light rounded-full flex items-center justify-center hover:bg-luxury-gold hover:text-white transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Phone className="w-5 h-5" />
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
