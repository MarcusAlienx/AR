import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Instagram, Facebook } from 'lucide-react';
import TiktokIcon from '@/components/UI/icons/TiktokIcon.tsx';
import PinterestIcon from '@/components/UI/icons/PinterestIcon.tsx';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger, 
  navigationMenuTriggerStyle 
} from '@/components/UI/navigation-menu';
import { cn } from '@/lib/utils';

const collections = [
  { title: "Novia", href: "/collections/novia", description: "Vestidos únicos para el día más importante.", category: "novia" },
  { title: "XV Años", href: "/collections/xv", description: "Diseños que capturan la magia de un momento único.", category: "xv" },
  { title: "Noche", href: "/collections/noche", description: "Elegancia y sofisticación para eventos especiales.", category: "noche" },
  { title: "Cortos", href: "/collections/cortos", description: "La perfecta combinación entre elegancia y versatilidad.", category: "cortos" },
  { title: "Primavera", href: "/collections/primavera", description: "Diseños frescos y vibrantes que celebran la temporada.", category: "primavera" },
  { title: "Alquiler", href: "/collections/alquiler", description: "Servicio de alquiler de vestidos de alta costura.", category: "alquiler" },
];

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const navigationItems = [
    { href: '/', label: 'INICIO' },
    { href: '/about', label: 'ACERCA DE' },
    { href: '/contact', label: 'CONTACTO' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

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
          <div className="flex items-center justify-between h-20">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between w-full">
              <div className="flex-1">
                <motion.button
                  className="relative z-50 p-2 hover:bg-gray-50/80 rounded-full transition-all duration-300"
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="flex-1 text-center">
                <Link href="/">
                  <img src="https://res.cloudinary.com/dyzlfyyv3/image/upload/h_48,c_scale,f_auto,q_auto/v1/AR_logo_rylshw.webp" alt="Alberto Rodríguez Logo" className="h-12 w-auto object-contain mx-auto" />
                </Link>
              </div>

              <div className="flex-1 flex justify-end items-center space-x-2">
                <a href="https://www.instagram.com/albertorodriguezmoda/" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-50/80 rounded-full transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/albertorodriguez.mx" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-50/80 rounded-full transition-all duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://www.tiktok.com/@arodriguezmoda" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-50/80 rounded-full transition-all duration-300 hidden sm:inline-block">
                  <TiktokIcon className="w-5 h-5" />
                </a>
                <a href="https://es.pinterest.com/arodriguezmoda/" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-gray-50/80 rounded-full transition-all duration-300 hidden sm:inline-block">
                  <PinterestIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Desktop Navigation Wrapper */}
            <div className="hidden lg:flex items-center justify-between w-full">
              {/* Left Section */}
              <div className="flex-1 flex justify-start items-center space-x-1">
                <Link href="/">
                  <span className={cn(navigationMenuTriggerStyle(), "text-sm font-medium tracking-luxury cursor-pointer", location === '/' ? 'text-luxury-gold' : 'text-luxury-black')}>
                    INICIO
                  </span>
                </Link>

                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), "text-sm font-medium tracking-luxury", location.startsWith('/collections') ? 'text-luxury-gold' : 'text-luxury-black')}>
                        COLECCIONES
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                          {collections.map((component) => (
                            <ListItem
                              key={component.title}
                              title={component.title}
                              href={component.href}
                            >
                              {component.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              {/* Center Logo */}
              <div className="px-4">
                <motion.div 
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
                      <img src="https://res.cloudinary.com/dyzlfyyv3/image/upload/h_64,c_scale,f_auto,q_auto/v1/AR_logo_rylshw.webp" alt="Alberto Rodríguez Logo" className="h-16" />
                    </motion.div>
                  </Link>
                </motion.div>
              </div>

              {/* Right Section */}
              <div className="flex-1 flex justify-end items-center space-x-1">
                {navigationItems.slice(1).map((item) => (
                  <Link href={item.href} key={item.href}>
                    <span className={cn(navigationMenuTriggerStyle(), "text-sm font-medium tracking-luxury cursor-pointer", location === item.href ? 'text-luxury-gold' : 'text-luxury-black')}>
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
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
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeMenu}
            />
            <motion.div
              className="absolute top-0 left-0 w-80 h-full bg-white shadow-2xl"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
            >
              <div className="pt-24 pb-8 px-8">
                <Link href="/" onClick={closeMenu}>
                  <img src="https://res.cloudinary.com/dyzlfyyv3/image/upload/h_48,c_scale,f_auto,q_auto/v1/AR_logo_rylshw.webp" alt="Alberto Rodríguez Logo" className="h-8" />
                </Link>
                <div className="w-16 h-px bg-luxury-gold mt-2 mb-12" />

                <ul className="space-y-4">
                  <li><Link href="/" onClick={closeMenu} className="text-lg font-medium tracking-luxury">INICIO</Link></li>
                  <li>
                    <Link href="/collections" onClick={closeMenu} className="text-lg font-medium tracking-luxury text-luxury-gold">COLECCIONES</Link>
                    <ul className="pl-4 mt-2 space-y-2">
                      {collections.map(item => (
                        <li key={item.href}>
                          <Link href={item.href} onClick={closeMenu} className="text-md text-gray-700 hover:text-luxury-gold transition-colors">
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li><Link href="/about" onClick={closeMenu} className="text-lg font-medium tracking-luxury">ACERCA DE</Link></li>
                  <li><Link href="/contact" onClick={closeMenu} className="text-lg font-medium tracking-luxury">CONTACTO</Link></li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

export default Header;