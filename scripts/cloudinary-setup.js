#!/usr/bin/env node

/**
 * Script de configuración de Cloudinary para Alberto Rodríguez Couture
 * 
 * Ejecutar con: node scripts/cloudinary-setup.js
 */

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🌟 Configuración de Cloudinary - Alberto Rodríguez Couture');
console.log('===============================================\n');

const questions = [
  {
    key: 'VITE_CLOUDINARY_CLOUD_NAME',
    question: 'Cloud Name (recomendado: alberto-rodriguez-couture): ',
    default: 'alberto-rodriguez-couture'
  },
  {
    key: 'VITE_CLOUDINARY_API_KEY',
    question: 'API Key: '
  },
  {
    key: 'VITE_CLOUDINARY_API_SECRET',
    question: 'API Secret: '
  }
];

let answers = {};
let currentQuestion = 0;

function askQuestion() {
  if (currentQuestion >= questions.length) {
    createEnvFile();
    return;
  }

  const q = questions[currentQuestion];
  rl.question(q.question, (answer) => {
    answers[q.key] = answer.trim() || q.default || '';
    currentQuestion++;
    askQuestion();
  });
}

function createEnvFile() {
  console.log('\n📝 Creando archivo .env...');

  const envContent = `# Environment Configuration
NODE_ENV=development
PORT=5000

# Database Configuration  
DATABASE_URL=postgresql://user:password@localhost:5432/ar_couture

# Session Configuration
SESSION_SECRET=tu_session_secret_super_secreto_aqui_cambialo

# Security Configuration
CORS_ORIGIN=http://localhost:5000
HELMET_ENABLED=true

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_CMS=false
VITE_ENABLE_AUTH=false

# Cloudinary Configuration - CONFIGURADO AUTOMÁTICAMENTE
VITE_CLOUDINARY_CLOUD_NAME=${answers.VITE_CLOUDINARY_CLOUD_NAME}
VITE_CLOUDINARY_API_KEY=${answers.VITE_CLOUDINARY_API_KEY}
VITE_CLOUDINARY_API_SECRET=${answers.VITE_CLOUDINARY_API_SECRET}
VITE_CLOUDINARY_SECURE=true
VITE_CLOUDINARY_UPLOAD_PRESET=ar_couture_preset

# CMS Configuration (para futuro)
# SANITY_PROJECT_ID=your-project-id
# SANITY_DATASET=production
# STRAPI_API_URL=http://localhost:1337

# Analytics Configuration (opcional)
# GOOGLE_ANALYTICS_ID=
# HOTJAR_ID=
# FACEBOOK_PIXEL_ID=

# Email Configuration (opcional)
# SMTP_HOST=
# SMTP_PORT=587
# SMTP_USER=
# SMTP_PASS=
# FROM_EMAIL=noreply@albertorodriguez.com

# Backup Configuration (opcional)
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
# AWS_BUCKET_NAME=ar-couture-backups
# AWS_REGION=us-east-1
`;

  fs.writeFileSync('.env', envContent);
  
  console.log('✅ Archivo .env creado exitosamente');
  console.log('\n🔧 Siguiente paso: Estructura de carpetas en Cloudinary');
  console.log('Revisa el archivo CLOUDINARY_SETUP.md para continuar\n');
  
  showImageStructure();
  rl.close();
}

function showImageStructure() {
  console.log('📂 Estructura de carpetas requerida en Cloudinary:');
  console.log(`
/alberto-rodriguez-couture/
├── collections/
│   ├── novia/ (6 imágenes)
│   ├── xv/ (5 imágenes)  
│   ├── noche/ (4 imágenes)
│   ├── cortos/ (3 imágenes)
│   ├── primavera/ (3 imágenes)
│   └── alquiler/ (3 imágenes)
├── red-carpet/
│   ├── celebrities/ (5 imágenes)
│   ├── clientas/ (4 imágenes)
│   ├── fashion-week/ (4 imágenes)
│   └── desfiles/ (4 imágenes)
└── services/
    ├── design/ (3 imágenes)
    ├── attention/ (2 imágenes)
    └── quality/ (3 imágenes)

Total: 49 imágenes organizadas por categorías
  `);
  
  console.log('💡 Sugerencia: Usa el Upload Widget de Cloudinary para subir por lotes');
  console.log('📖 Consulta CLOUDINARY_SETUP.md para instrucciones detalladas');
}

// Validar que el script se ejecute desde la raíz del proyecto
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: Ejecuta este script desde la raíz del proyecto');
  process.exit(1);
}

// Verificar si ya existe .env
if (fs.existsSync('.env')) {
  rl.question('⚠️  El archivo .env ya existe. ¿Sobrescribir? (y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      askQuestion();
    } else {
      console.log('Configuración cancelada.');
      rl.close();
    }
  });
} else {
  askQuestion();
}