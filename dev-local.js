#!/usr/bin/env node

/**
 * Script de desarrollo local para Alberto Rodríguez Couture
 * Configura automáticamente el entorno de desarrollo con VSCode
 */

import { spawn } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkPrerequisites() {
  log('🔍 Verificando prerrequisitos...', 'blue');
  
  // Verificar Node.js
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  if (majorVersion < 18) {
    log(`❌ Node.js ${nodeVersion} detectado. Se requiere Node.js 18+`, 'red');
    process.exit(1);
  }
  
  log(`✅ Node.js ${nodeVersion} - OK`, 'green');
  
  // Verificar npm
  try {
    const npmCheck = spawn('npm', ['--version'], { stdio: 'pipe' });
    npmCheck.on('close', (code) => {
      if (code === 0) {
        log('✅ npm - OK', 'green');
      }
    });
  } catch (error) {
    log('❌ npm no encontrado', 'red');
    process.exit(1);
  }
}

function setupEnvironment() {
  log('⚙️ Configurando variables de entorno...', 'blue');
  
  if (!existsSync('.env')) {
    if (existsSync('.env.example')) {
      const envContent = `# Base de datos (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb"

# Configuración del servidor
NODE_ENV=development
PORT=5000

# URLs para desarrollo local
VITE_API_URL=http://localhost:5000
VITE_SITE_URL=http://localhost:5000

# Analytics (opcional)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_HOTJAR_ID=1234567

# Configuración de sesiones
SESSION_SECRET=${Math.random().toString(36).substring(2, 15)}

# Features flags (opcional)
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_CMS=false
VITE_ENABLE_AUTH=false`;

      writeFileSync('.env', envContent);
      log('✅ Archivo .env creado desde .env.example', 'green');
    } else {
      log('⚠️ No se encontró .env.example, creando .env básico', 'yellow');
      writeFileSync('.env', 'NODE_ENV=development\nPORT=5000');
    }
  } else {
    log('✅ Archivo .env ya existe', 'green');
  }
}

function installDependencies() {
  return new Promise((resolve, reject) => {
    log('📦 Instalando dependencias...', 'blue');
    
    const npm = spawn('npm', ['install'], { stdio: 'inherit' });
    
    npm.on('close', (code) => {
      if (code === 0) {
        log('✅ Dependencias instaladas correctamente', 'green');
        resolve();
      } else {
        log('❌ Error instalando dependencias', 'red');
        reject(new Error('Failed to install dependencies'));
      }
    });
  });
}

function startDevelopment() {
  log('🚀 Iniciando servidor de desarrollo...', 'blue');
  log('', 'reset');
  log('📱 Frontend: http://localhost:5000', 'cyan');
  log('🔧 Backend: http://localhost:5000', 'cyan');
  log('', 'reset');
  log('💡 Comandos útiles:', 'yellow');
  log('   - Ctrl+C: Detener servidor', 'reset');
  log('   - Ctrl+Shift+P en VSCode: Abrir Command Palette', 'reset');
  log('   - F5 en VSCode: Iniciar debug', 'reset');
  log('', 'reset');
  
  const dev = spawn('npm', ['run', 'dev'], { stdio: 'inherit' });
  
  dev.on('close', (code) => {
    log(`🔚 Servidor cerrado con código ${code}`, 'yellow');
  });
  
  // Manejar interrupción
  process.on('SIGINT', () => {
    log('\n🛑 Cerrando servidor de desarrollo...', 'yellow');
    dev.kill();
    process.exit(0);
  });
}

function openVSCode() {
  log('🔧 Abriendo VSCode...', 'blue');
  
  try {
    spawn('code', ['.'], { stdio: 'inherit', detached: true });
    log('✅ VSCode abierto (si está instalado)', 'green');
  } catch (error) {
    log('⚠️ No se pudo abrir VSCode automáticamente', 'yellow');
    log('   Por favor abre VSCode manualmente en esta carpeta', 'reset');
  }
}

async function main() {
  log('🎨 Alberto Rodríguez Couture - Configuración Local', 'magenta');
  log('================================================', 'magenta');
  
  try {
    checkPrerequisites();
    setupEnvironment();
    await installDependencies();
    
    // Preguntar si abrir VSCode
    const args = process.argv.slice(2);
    if (args.includes('--vscode') || args.includes('-v')) {
      openVSCode();
      // Esperar un poco antes de iniciar el servidor
      setTimeout(startDevelopment, 2000);
    } else {
      startDevelopment();
    }
    
  } catch (error) {
    log(`❌ Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Ejecutar solo si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}