# Guía de Contribución

## 🚀 Cómo Contribuir

Gracias por tu interés en contribuir al proyecto Alberto Rodríguez Couture. Este documento te guiará a través del proceso.

### ✅ Estándares de Calidad

Para mantener la calidad y consistencia del código, todas las contribuciones deben cumplir con los siguientes requisitos antes de ser consideradas para merge:

- **Pasar el Linter:** El código no debe tener errores ni advertencias de ESLint. Ejecuta `npm run lint` para verificar.
- **Pasar las Pruebas:** Todas las pruebas unitarias y de integración deben pasar correctamente. Ejecuta `npm test` para verificar.

El pipeline de Integración Continua (CI) validará estos dos puntos automáticamente en cada Pull Request.

### Antes de Empezar

1. **Fork el repositorio** en GitHub
2. **Clona tu fork** localmente:
```bash
git clone https://github.com/tu-usuario/alberto-rodriguez-couture.git
cd alberto-rodriguez-couture
```

3. **Configura el upstream**:
```bash
git remote add upstream https://github.com/original-repo/alberto-rodriguez-couture.git
```

### Configuración de Desarrollo

1. **Instala dependencias**:
```bash
npm install
```

2. **Copia variables de entorno**:
```bash
cp .env.example .env
```

3. **Configura base de datos** (opcional para frontend):
```bash
npm run db:push
```

4. **Inicia desarrollo**:
```bash
npm run dev
```

### Flujo de Trabajo

1. **Crea una rama nueva**:
```bash
git checkout -b feature/nueva-caracteristica
# o
git checkout -b fix/correccion-bug
# o
git checkout -b docs/actualizacion-documentacion
```

2. **Haz tus cambios** siguiendo los estándares del proyecto

3. **Verifica que todo funciona**:
```bash
npm run lint
npm run test
npm run build
```

4. **Commit tus cambios**:
```bash
git add .
git commit -m "feat: añade nueva característica X"
```

5. **Push a tu fork**:
```bash
git push origin feature/nueva-caracteristica
```

6. **Crea un Pull Request** en GitHub

### Estándares de Código

#### TypeScript
- Usa TypeScript estricto
- Exporta tipos desde `shared/schema.ts`
- No uses `any`, prefiere `unknown`

#### React
- Usa componentes funcionales con hooks
- Implementa PropTypes para componentes reutilizables
- Usa nombres descriptivos para hooks personalizados

#### Estilos
- Usa Tailwind CSS para estilos
- Mantén clases organizadas: layout → spacing → colors → effects
- Usa variables CSS para colores de marca

#### Estructura de Archivos
```
src/
├── components/
│   ├── Layout/     # Header, Footer, etc.
│   └── UI/         # Botones, Cards, etc.
├── pages/          # Páginas principales
├── hooks/          # React hooks personalizados
└── lib/            # Utilidades y configuración
```

### Tipos de Contribuciones

#### 🐛 Reportar Bugs
- Usa el template de issue para bugs
- Incluye pasos para reproducir
- Especifica navegador y versión
- Adjunta screenshots si es visual

#### ✨ Nuevas Características
- Abre un issue primero para discutir
- Asegúrate de que sea consistente con el diseño
- Incluye tests si es aplicable
- Actualiza documentación

#### 📚 Documentación
- Mejoras en README.md
- Comentarios en código complejo
- Guías de usuario
- Documentación técnica

#### 🎨 Mejoras de UI/UX
- Mantén la estética de lujo
- Respeta la paleta de colores
- Asegúrate de responsividad
- Considera accesibilidad

### Convenciones de Commits

Usamos [Conventional Commits](https://conventionalcommits.org/):

```
tipo(scope): descripción

[cuerpo opcional]

[footer opcional]
```

#### Tipos:
- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan código)
- `refactor`: Refactoring de código
- `test`: Añadir o modificar tests
- `chore`: Tareas de mantenimiento

#### Ejemplos:
```bash
feat(collections): añade filtrado por categoría
fix(header): corrige navegación en móvil
docs(readme): actualiza guía de instalación
style(footer): mejora espaciado en enlaces
```

### Tests

El proyecto usa **Vitest** para pruebas unitarias y de integración, y **React Testing Library** para componentes.

```bash
# Ejecutar todas las pruebas en la terminal
npm test

# Abrir la interfaz gráfica de Vitest para desarrollo interactivo
npm run test:ui
```

### Revisión de Código

#### Criterios de Aceptación
- [ ] El código funciona según lo especificado
- [ ] Todas las pruebas pasan (`npm test`)
- [ ] El linter pasa sin errores (`npm run lint`)
- [ ] Build es exitoso (`npm run build`)
- [ ] Documentación actualizada
- [ ] No hay console.logs olvidados
- [ ] Accesibilidad considerada

#### Proceso de Review
1. **Autor** crea Pull Request
2. **Reviewer** asignado automáticamente
3. **Feedback** a través de comentarios
4. **Cambios** implementados por autor
5. **Aprobación** y merge

### Código de Conducta

#### Nuestros Estándares
- Sé respetuoso y profesional
- Acepta críticas constructivas
- Enfócate en el beneficio del proyecto
- Ayuda a otros contribuyentes

#### Comportamientos No Aceptables
- Lenguaje ofensivo o discriminatorio
- Ataques personales
- Spam o trolling
- Violación de privacidad

### Recursos Útiles

#### Documentación
- [React Docs](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide)

#### Herramientas
- [VS Code](https://code.visualstudio.com/) - Editor recomendado
- [React DevTools](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

### Preguntas Frecuentes

#### ¿Puedo trabajar en múltiples issues?
Sí, pero mantén PRs separados para diferentes características.

#### ¿Cómo actualizo mi fork?
```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

#### ¿Qué hago si mi PR tiene conflictos?
```bash
git fetch upstream
git rebase upstream/main
git push origin feature/mi-rama --force-with-lease
```

#### ¿Puedo usar librerías externas?
Abre un issue primero para discutir. Preferimos mantener dependencias mínimas.

### Reconocimientos

Todos los contribuyentes aparecerán en:
- README.md del proyecto
- Sección de créditos en la aplicación
- Releases notes importantes

¡Gracias por contribuir a Alberto Rodríguez Couture! 🎭✨