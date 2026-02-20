# 🚀 Portafolio Web - Romario Martinez

## 📌 Descripción General

Este es un portafolio web profesional desarrollado con una arquitectura moderna basada en **React**, **TypeScript** y patrones de diseño empresarial. El proyecto sigue los principios de **Clean Architecture** y utiliza las mejores prácticas de desarrollo web actual.

---

## 🏗️ Arquitectura del Proyecto

### Visión General

El portafolio está construido con una arquitectura de **tres capas**:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  (React Components, Pages, UI)                              │
├─────────────────────────────────────────────────────────────┤
│                    BUSINESS LOGIC LAYER                      │
│  (Contexts, Hooks, Services)                                │
├─────────────────────────────────────────────────────────────┤
│                    DATA ACCESS LAYER                        │
│  (Repositories, Supabase Client)                            │
└─────────────────────────────────────────────────────────────┘
```

### 1. Capa de Presentación (`src/components/`)

Esta capa contiene todos los componentes visuales de la aplicación.

```
components/
├── ui/                    # Componentes reutilizables
│   └── Skeleton.tsx      # Estados de carga
├── admin/                 # Panel de administración
│   ├── AdminLogin.tsx    # Página de login
│   ├── AdminPanel.tsx    # Panel principal
│   ├── ProfileEditor.tsx # Editor de perfil
│   └── ...               # Otros editores
├── Header.tsx            # Navegación principal
├── Hero.tsx              # Sección principal
├── Education.tsx        # Educación
├── Experience.tsx         # Experiencia laboral
├── Skills.tsx            # Habilidades técnicas
├── Projects.tsx          # Proyectos realizados
├── Certifications.tsx    # Certificaciones
└── Contact.tsx          # Formulario de contacto
```

**Características:**
- Componentes funcionales con hooks
- Props tipados con TypeScript
- Styled con Tailwind CSS
- Animaciones con Framer Motion

### 2. Capa de Lógica de Negocio (`src/contexts/`)

Maneja el estado global de la aplicación.

```
contexts/
├── AuthContext.tsx      # Autenticación de usuarios
├── ThemeContext.tsx     # Tema (claro/oscuro)
└── LanguageContext.tsx  # Internacionalización
```

**Patrones utilizados:**
- **Context API** para estado global
- **Provider Pattern** para inyectar dependencias
- **Custom Hooks** para lógica reutilizable

### 3. Capa de Acceso a Datos (`src/repositories/`)

Abstrae la comunicación con la base de datos.

```
repositories/
├── BaseRepository.ts     # Clase base con CRUD
├── ProfileRepository.ts  # Repositorio de perfil
└── index.ts            # Exports централизованные
```

**Características:**
- **Patrón Repository** para aislar la lógica de datos
- **Caching en memoria** para optimizar rendimiento
- **Tipado fuerte** con TypeScript

---

## 🔄 Flujo de Datos

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Componente │────▶│  Repository  │────▶│  Supabase   │
│   (UI)       │     │  (Lógica)   │     │  (Datos)    │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                    │
       │ useState          │ getAll()           │ SELECT
       │ useEffect         │ getById()          │ INSERT
       │ render            │ create()            │ UPDATE
       │                   │ update()            │ DELETE
       │                   │ delete()
       │◀──────────────────│
       │  Datos (JSON)     │
```

---

## 📦 Gestión de Estado

### Estado Global

| Contexto | Propósito | Persistencia |
|----------|-----------|--------------|
| AuthContext | Usuario autenticado | Sesión de Supabase |
| ThemeContext | Tema claro/oscuro | localStorage |
| LanguageContext | Idioma (es/en) | localStorage |

### Estado Local

- **useState** para estado de componentes
- **useEffect** para efectos secundarios
- **useMemo** para optimización

---

## 🗄️ Estructura de Base de Datos

### Tablas de Supabase

```sql
profiles        -- Información personal
education       -- Estudios académicos
experience      -- Experiencia laboral  
skills          -- Habilidades técnicas
projects        -- Proyectos realizados
certifications  -- Certificaciones
```

### Esquema de Datos

```
┌────────────────────────────────────────────────────────────┐
│                         PROFILES                           │
├─────────────────────┬──────────────────────────────────────┤
│ Campo               │ Tipo                                  │
├─────────────────────┼──────────────────────────────────────┤
│ id                 │ UUID (PK)                              │
│ full_name          │ TEXT                                   │
│ title_es           │ TEXT                                   │
│ title_en           │ TEXT                                   │
│ bio_es             │ TEXT                                   │
│ bio_en             │ TEXT                                   │
│ photo_url          │ TEXT                                   │
│ email              │ TEXT                                   │
│ phone              │ TEXT                                   │
│ location           │ TEXT                                   │
│ linkedin           │ TEXT                                   │
│ github             │ TEXT                                   │
│ website            │ TEXT                                   │
│ created_at         │ TIMESTAMP                              │
│ updated_at         │ TIMESTAMP                              │
└─────────────────────┴──────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                         SKILLS                            │
├─────────────────────┬──────────────────────────────────────┤
│ Campo               │ Tipo                                  │
├─────────────────────┼──────────────────────────────────────┤
│ id                 │ UUID (PK)                              │
│ name_es            │ TEXT                                   │
│ name_en            │ TEXT                                   │
│ category_es        │ TEXT                                   │
│ category_en        │ TEXT                                   │
│ level              │ INTEGER (0-100)                        │
│ image_url         │ TEXT                                   │
│ order_index        │ INTEGER                                │
└─────────────────────┴──────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                        PROJECTS                            │
├─────────────────────┬──────────────────────────────────────┤
│ Campo               │ Tipo                                  │
├─────────────────────┼──────────────────────────────────────┤
│ id                 │ UUID (PK)                              │
│ name_es            │ TEXT                                   │
│ name_en            │ TEXT                                   │
│ description_es    │ TEXT                                   │
│ description_en    │ TEXT                                   │
│ technologies       │ TEXT[] (ARRAY)                         │
│ image_url         │ TEXT                                   │
│ demo_url          │ TEXT                                   │
│ repo_url          │ TEXT                                   │
│ order_index        │ INTEGER                                │
└─────────────────────┴──────────────────────────────────────┘
```

---

## 🔐 Sistema de Autenticación

El portafolio utiliza **Supabase Auth** para gestionar el acceso al panel de administración.

### Flujo de Autenticación

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Usuario   │────▶│  Supabase    │────▶│   App        │
│  (Login)    │     │   Auth       │     │  (Dashboard) │
└──────────────┘     └──────────────┘     └──────────────┘
      │                    │                    │
      │ Email/Password     │                    │
      │───────────────────▶│                    │
      │                    │ JWT Token          │
      │◀──────────────────│                    │
      │                    │                    │
      │                    │ Bearer Token       │
      │─────────────────────────────────────────▶│
      │                    │                    │ Verificar
      │                    │                    │ Acceso
```

---

## ⚡ Rendimiento

### Estrategias Implementadas

1. **Caching en Memoria**
   - TTL de 5 minutos para datos de Supabase
   - Invalidación automática en CRUD

2. **Lazy Loading**
   - Imágenes con `loading="lazy"`
   - Decodificación async de imágenes

3. **Skeleton Loaders**
   - Estados de carga skeleton en lugar de spinners
   - Mejora percepción de velocidad

4. **Code Splitting**
   - Vite optimiza automáticamente
   - Tree shaking de dependencias

---

## 🌐 SEO y Metaetiquetas

### Metaetiquetas Configuradas

```html
<meta name="description" content="Portafolio profesional de Romario Martinez...">
<meta name="keywords" content="desarrollador, full stack, react, typescript...">
<meta property="og:title" content="Romario Martinez - Desarrollador Full Stack">
<meta property="og:image" content="...">
<meta name="twitter:card" content="summary_large_image">
```

### PWA

- Manifest.json configurado
- Theme color
- Iconos responsivos

---

## 🧪 Testing

### Tipos de Tests

| Tipo | Herramienta | Propósito |
|------|-------------|-----------|
| Unit | Vitest | Funciones utilitarias |
| Components | React Testing Library | Componentes UI |
| Accessibility | jest-axe | Accesibilidad WCAG |

---

## 🚀 Despliegue

### Producción

```bash
# 1. Build
npm run build

# 2. Preview local
npm run preview
```

### Entornos

| Entorno | URL |
|---------|-----|
| Desarrollo | localhost:5173 |
| Producción | (Firebase/Vercel) |

---

## 📁 Estructura Completa de Archivos

```
romarioportafolio/
├── public/
│   ├── logo.png              # Logo del portafolio
│   ├── manifest.json         # Manifesto PWA
│   ├── sitemap.xml           # Mapa del sitio
│   └── vite.svg              # Favicon
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   └── Skeleton.tsx
│   │   ├── admin/
=======
Portafolio web personal desarrollado con React, TypeScript y Vite. Incluye un panel de administración para gestionar el contenido dinámicamente y está desplegado en Firebase Hosting.

## ✨ Características

- 🎨 **Diseño Moderno y Responsive**: Interfaz adaptativa que se ve perfecta en todos los dispositivos
- 🌙 **Modo Oscuro/Claro**: Soporte para temas claro y oscuro con detección automática de preferencias del sistema
- 🌍 **Multiidioma**: Soporte para español e inglés con cambio dinámico de idioma
- 📱 **Totalmente Responsive**: Optimizado para móviles, tablets y escritorio
- ⚡ **Rendimiento Optimizado**: Construido con Vite para tiempos de carga ultrarrápidos
- 🎭 **Animaciones Suaves**: Transiciones y animaciones fluidas con Framer Motion
- 🔐 **Panel de Administración**: Sistema de autenticación y gestión de contenido mediante Supabase
- 📊 **Gestión Dinámica de Contenido**: Edición en tiempo real de:
  - Perfil personal
  - Educación
  - Experiencia laboral
  - Habilidades técnicas
  - Proyectos
  - Certificaciones

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos utility-first
- **Framer Motion** - Biblioteca de animaciones
- **Lucide React** - Iconos modernos

### Backend y Base de Datos
- **Supabase** - Backend as a Service (BaaS) para autenticación y base de datos

### Despliegue
- **Firebase Hosting** - Hosting estático

### Testing
- **Vitest** - Framework de testing
- **React Testing Library** - Utilidades para testing de componentes

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **Firebase CLI** (para despliegue)
- Una cuenta de **Supabase** (para la base de datos)

## 🚀 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/romarioportafolio.git
   cd romarioportafolio
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
   ```

   Puedes obtener estas credenciales desde tu proyecto en [Supabase](https://supabase.com).

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

   El proyecto estará disponible en `http://localhost:5173`

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter para verificar el código
- `npm run typecheck` - Verifica los tipos de TypeScript
- `npm test` - Ejecuta los tests con Vitest

## 📁 Estructura del Proyecto

```
romarioportafolio/
├── public/                 # Archivos estáticos
│   └── logo.png
├── src/
│   ├── components/         # Componentes React
│   │   ├── admin/         # Panel de administración
>>>>>>> 9e5d7f5a199c26a2469fd6762cd2d1a03a90e22c
│   │   │   ├── AdminLogin.tsx
│   │   │   ├── AdminPanel.tsx
│   │   │   ├── ProfileEditor.tsx
│   │   │   ├── EducationEditor.tsx
│   │   │   ├── ExperienceEditor.tsx
│   │   │   ├── SkillsEditor.tsx
│   │   │   ├── ProjectsEditor.tsx
│   │   │   └── CertificationsEditor.tsx
<<<<<<< HEAD
│   │   ├── tests/
│   │   │   ├── Accessibility.test.tsx
│   │   │   └── ...
=======
>>>>>>> 9e5d7f5a199c26a2469fd6762cd2d1a03a90e22c
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
<<<<<<< HEAD
│   │   ├── Certifications.tsx
│   │   └── Contact.tsx
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── LanguageContext.tsx
│   ├── lib/
│   │   ├── analytics.ts       # Sistema de analytics
│   │   ├── supabase.ts       # Cliente Supabase
│   │   └── database.types.ts  # Tipos de BD
│   ├── repositories/
│   │   ├── BaseRepository.ts
│   │   ├── ProfileRepository.ts
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── setupTests.ts
├── .env                       # Variables de entorno
├── .gitignore
├── eslint.config.js
├── firebase.json
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── tsconfig.vitest.json
└── vite.config.ts
```

---

## 🛠️ Tecnologías y Dependencias

### Dependencias Principales

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| react | 18.3 | Framework UI |
| typescript | 5.5 | Tipado estático |
| vite | 5.4 | Build tool |
| tailwindcss | 3.4 | Estilos CSS |
| framer-motion | 12.23 | Animaciones |
| @supabase/supabase-js | 2.74 | Backend/BD |
| lucide-react | 0.344 | Iconos |

### Dependencias de Desarrollo

| Paquete | Propósito |
|---------|-----------|
| vitest | Testing |
| @testing-library/react | Testing UI |
| eslint | Linting |
| @types/jest-axe | Tests a11y |

---

## 📋 Scripts Disponibles

```bash
npm run dev          # Iniciar servidor desarrollo
npm run build        # Build producción
npm run preview      # Preview producción
npm run lint         # Verificar código
npm run typecheck   # Verificar tipos
npm test            # Ejecutar tests
```

---

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request

---

## 📄 Licencia

Copyright © 2026 Romario Martinez. Todos los derechos reservados.

---

## 📞 Contacto

- Email: [romariomartiinez@gmail.com]
- LinkedIn: [tu-perfil-linkedin]
- GitHub: [tu-usuario-github]

---

⭐ Si te gusta este proyecto, ¡dale una estrella!
=======
│   │   └── Certifications.tsx
│   ├── contexts/          # Contextos de React
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── LanguageContext.tsx
│   ├── lib/              # Utilidades y configuración
│   │   ├── supabase.ts
│   │   └── database.types.ts
│   ├── repositories/     # Repositorios para acceso a datos
│   │   ├── BaseRepository.ts
│   │   ├── ProfileRepository.ts
│   │   └── index.ts
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Punto de entrada
│   └── index.css         # Estilos globales
├── firebase.json         # Configuración de Firebase Hosting
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🔥 Despliegue en Firebase Hosting

### Configuración Inicial

1. **Instala Firebase CLI** (si no lo tienes)
   ```bash
   npm install -g firebase-tools
   ```

2. **Inicia sesión en Firebase**
   ```bash
   firebase login
   ```

3. **Inicializa Firebase en tu proyecto** (si es la primera vez)
   ```bash
   firebase init hosting
   ```
   
   Selecciona:
   - Usar un proyecto existente o crear uno nuevo
   - Directorio público: `dist`
   - Configurar como SPA: `Yes`
   - Sobrescribir index.html: `No`

### Despliegue

1. **Construye la aplicación para producción**
   ```bash
   npm run build
   ```

2. **Despliega en Firebase Hosting**
   ```bash
   firebase deploy --only hosting
   ```

   O si quieres desplegar todo:
   ```bash
   firebase deploy
   ```

3. **Tu sitio estará disponible en:**
   ```
   https://tu-proyecto.web.app
   ```
   o
   ```
   https://tu-proyecto.firebaseapp.com
   ```

### Configuración de Firebase

El archivo `firebase.json` está configurado para:
- Servir archivos desde el directorio `dist`
- Redirigir todas las rutas a `index.html` (SPA)
- Ignorar archivos innecesarios en el despliegue

## 🔐 Panel de Administración

El portafolio incluye un panel de administración accesible en `/admin` que permite:

- Autenticación segura mediante Supabase
- Edición de perfil personal
- Gestión de educación y experiencia
- Administración de habilidades técnicas
- Gestión de proyectos
- Administración de certificaciones

Para acceder, navega a `/admin` y utiliza tus credenciales de Supabase.

## 🎨 Personalización

### Temas

El proyecto soporta temas claro y oscuro. La preferencia se guarda en `localStorage` y se detecta automáticamente según las preferencias del sistema.

### Idiomas

Actualmente soporta español e inglés. Puedes agregar más idiomas modificando el `LanguageContext`.

### Estilos

Los estilos están configurados con Tailwind CSS. Puedes personalizar los colores, fuentes y espaciados en `tailwind.config.js`.

## 🧪 Testing

Ejecuta los tests con:
```bash
npm test
```

Los tests están ubicados en `src/components/tests/` y utilizan Vitest y React Testing Library.

## 📝 Licencia

Este proyecto es de uso personal. Todos los derechos reservados.

## 👤 Autor

**Romario Martinez**

- Portafolio: [Enlace a tu portafolio desplegado]
- GitHub: [@tu-usuario]
- LinkedIn: [Tu perfil de LinkedIn]

## 🙏 Agradecimientos

- [Vite](https://vitejs.dev/) - Por el excelente tooling
- [React](https://react.dev/) - Por la increíble biblioteca
- [Tailwind CSS](https://tailwindcss.com/) - Por los estilos utility-first
- [Supabase](https://supabase.com/) - Por el backend as a service
- [Firebase](https://firebase.google.com/) - Por el hosting gratuito y confiable

---

⭐ Si te gusta este proyecto, ¡no olvides darle una estrella!

