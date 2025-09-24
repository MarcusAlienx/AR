import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Términos y Condiciones - Alberto Rodríguez</title>
        <meta name="description" content="Términos y condiciones de uso de Alberto Rodríguez Couture." />
      </Helmet>
      <div className="pt-32 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Términos y Condiciones</h1>
        <p className="mt-6 text-xl text-gray-500">Última actualización: 23 de Septiembre de 2025</p>

        <div className="mt-12 space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">1. Aceptación de los Términos</h2>
            <p className="mt-4 text-lg text-gray-500">
              Al acceder y utilizar nuestro sitio web, usted acepta y se compromete a cumplir con los siguientes términos y condiciones de uso. Si no está de acuerdo con estos términos, no debe utilizar nuestro sitio web.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">2. Política de Uso</h2>
            <p className="mt-4 text-lg text-gray-500">
              Se le concede una licencia limitada para acceder y hacer uso personal de este sitio. Esta licencia no incluye ninguna reventa o uso comercial de este sitio o su contenido; cualquier colección y uso de listados de productos, descripciones o precios; cualquier uso derivado de este sitio o su contenido; cualquier descarga o copia de información de cuenta para el beneficio de otro comerciante; o cualquier uso de minería de datos, robots o herramientas similares de recopilación y extracción de datos.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">3. Política de Consentimiento</h2>
            <p className="mt-4 text-lg text-gray-500">
              Al proporcionarnos su información personal a través de los formularios de este sitio, usted nos da su consentimiento para que recopilemos y utilicemos esa información con el fin de ponernos en contacto con usted en relación con su consulta.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">4. Propiedad Intelectual</h2>
            <p className="mt-4 text-lg text-gray-500">
              Todo el contenido incluido en este sitio, como texto, gráficos, logotipos, iconos de botones, imágenes, clips de audio, descargas digitales, compilaciones de datos y software, es propiedad de Alberto Rodríguez Couture o sus proveedores de contenido y está protegido por las leyes internacionales de derechos de autor.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">5. Limitación de Responsabilidad</h2>
            <p className="mt-4 text-lg text-gray-500">
              Este sitio se proporciona "tal cual" y "según disponibilidad". No hacemos representaciones ni garantías de ningún tipo, expresas o implícitas, en cuanto a la operación de este sitio o la información, contenido, materiales o productos incluidos en este sitio.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;