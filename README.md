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
│   │   │   ├── AdminLogin.tsx
│   │   │   ├── AdminPanel.tsx
│   │   │   ├── ProfileEditor.tsx
│   │   │   ├── EducationEditor.tsx
│   │   │   ├── ExperienceEditor.tsx
│   │   │   ├── SkillsEditor.tsx
│   │   │   ├── ProjectsEditor.tsx
│   │   │   └── CertificationsEditor.tsx
│   │   ├── tests/
│   │   │   ├── Accessibility.test.tsx
│   │   │   └── ...
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
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
