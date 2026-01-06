# 🚀 Portafolio Web - Romario Martinez

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
│   │   │   ├── AdminLogin.tsx
│   │   │   ├── AdminPanel.tsx
│   │   │   ├── ProfileEditor.tsx
│   │   │   ├── EducationEditor.tsx
│   │   │   ├── ExperienceEditor.tsx
│   │   │   ├── SkillsEditor.tsx
│   │   │   ├── ProjectsEditor.tsx
│   │   │   └── CertificationsEditor.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
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
