import { Link } from 'wouter';
import { Instagram, Facebook } from 'lucide-react';
import TiktokIcon from '@/components/UI/icons/TiktokIcon';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-2xl font-light mb-6 tracking-luxury">
              ALBERTO RODRÍGUEZ
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-md">
              Casa de alta costura fundada en 1986, especializada en vestidos de novia 
              y de gala con más de 35 años creando momentos únicos.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/albertorodriguezmoda/"
                className="w-10 h-10 bg-luxury-light rounded-full flex items-center justify-center hover:bg-luxury-gold hover:text-white transition-colors duration-300"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/albertorodriguez.mx"
                className="w-10 h-10 bg-luxury-light rounded-full flex items-center justify-center hover:bg-luxury-gold hover:text-white transition-colors duration-300"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@arodriguezmoda"
                className="w-10 h-10 bg-luxury-light rounded-full flex items-center justify-center hover:bg-luxury-gold hover:text-white transition-colors duration-300"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TiktokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-4 tracking-luxury">COLECCIONES</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/collections/novia">
                  <span className="text-gray-600 hover:text-luxury-gold transition-colors duration-300 cursor-pointer">
                    Novia
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/collections/xv">
                  <span className="text-gray-600 hover:text-luxury-gold transition-colors duration-300 cursor-pointer">
                    XV Años
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/collections/noche">
                  <span className="text-gray-600 hover:text-luxury-gold transition-colors duration-300 cursor-pointer">
                    Noche
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/collections/cortos">
                  <span className="text-gray-600 hover:text-luxury-gold transition-colors duration-300 cursor-pointer">
                    Cortos
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/collections/primavera">
                  <span className="text-gray-600 hover:text-luxury-gold transition-colors duration-300 cursor-pointer">
                    Primavera
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/collections/alquiler">
                  <span className="text-gray-600 hover:text-luxury-gold transition-colors duration-300 cursor-pointer">
                    Alquiler
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-4 tracking-luxury">EMPRESA</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about#historia">
                  <span className="text-gray-600 hover:text-luxury-gold transition-colors duration-300 cursor-pointer">
                    Historia
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-gray-600 hover:text-luxury-gold transition-colors duration-300 cursor-pointer">
                    Filosofía
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-600 hover:text-luxury-gold transition-colors duration-300 cursor-pointer">
                    Contacto
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2025 Alberto Rodríguez Couture. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/contact">
              <span className="text-gray-600 hover:text-luxury-gold text-sm transition-colors duration-300 cursor-pointer">
                Privacidad
              </span>
            </Link>
            <Link href="/contact">
              <span className="text-gray-600 hover:text-luxury-gold text-sm transition-colors duration-300 cursor-pointer">
                Términos
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
