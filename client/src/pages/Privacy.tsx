import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidad - Alberto Rodríguez</title>
        <meta name="description" content="Política de privacidad de Alberto Rodríguez Couture." />
      </Helmet>
      <div className="pt-32 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Política de Privacidad</h1>
        <p className="mt-6 text-xl text-gray-500">Última actualización: 23 de Septiembre de 2025</p>

        <div className="mt-12 space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">1. Introducción</h2>
            <p className="mt-4 text-lg text-gray-500">
              Bienvenido a Alberto Rodríguez Couture. Respetamos su privacidad y nos comprometemos a proteger sus datos personales. Esta política de privacidad le informará sobre cómo cuidamos sus datos personales cuando visita nuestro sitio web (independientemente de dónde lo visite) y le informará sobre sus derechos de privacidad y cómo la ley lo protege.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">2. Recopilación de Datos</h2>
            <p className="mt-4 text-lg text-gray-500">
              Recopilamos información personal que usted nos proporciona voluntariamente cuando se registra en el sitio web, expresa interés en obtener información sobre nosotros o nuestros productos y servicios, cuando participa en actividades en el sitio web o cuando nos contacta.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              La información personal que recopilamos puede incluir lo siguiente: nombre, número de teléfono, dirección de correo electrónico y otros datos similares.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">3. Uso de sus Datos</h2>
            <p className="mt-4 text-lg text-gray-500">
              Utilizamos la información personal recopilada a través de nuestro sitio web para una variedad de fines comerciales que se describen a continuación. Procesamos su información personal para estos fines en función de nuestros intereses comerciales legítimos, para celebrar o ejecutar un contrato con usted, con su consentimiento y/o para cumplir con nuestras obligaciones legales.
            </p>
            <ul className="mt-4 list-disc list-inside text-lg text-gray-500">
              <li>Para facilitar la creación de cuentas y el proceso de inicio de sesión.</li>
              <li>Para enviarle comunicaciones de marketing y promocionales.</li>
              <li>Para responder a sus consultas y ofrecer soporte.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">4. Almacenamiento y Protección de Datos</h2>
            <p className="mt-4 text-lg text-gray-500">
              Hemos implementado medidas de seguridad técnicas y organizativas apropiadas diseñadas para proteger la seguridad de cualquier información personal que procesemos. Sin embargo, a pesar de nuestras salvaguardas y esfuerzos para asegurar su información, ninguna transmisión electrónica a través de Internet o tecnología de almacenamiento de información puede garantizarse como 100% segura.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">5. Consentimiento</h2>
            <p className="mt-4 text-lg text-gray-500">
              Al utilizar nuestro sitio, usted acepta nuestra política de privacidad.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">6. Contacto</h2>
            <p className="mt-4 text-lg text-gray-500">
              Si tiene preguntas o comentarios sobre esta política, puede enviarnos un correo electrónico a info@albertorodriguez.com o por correo postal a:
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Alberto Rodríguez Couture<br />
              Av. Vallarta #1300<br />
              Guadalajara, Jalisco, México C.P. 44100
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;