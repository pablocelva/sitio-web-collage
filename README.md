# 🎨 Plantilla de Portafolio Artístico & Landing Page para Ilustradora / Artista de Collage

![pnpm](https://img.shields.io/badge/pnpm-v11.0.8-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Astro](https://img.shields.io/badge/Astro-v5.4.0-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.7.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-v3.24.2-3068B7?style=for-the-badge&logo=zod&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-v3.0.7-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media%20Optimization-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

> **Plantilla profesional y moderna para sitios web de artistas visuales, ilustradoras y creadoras enfocadas en collage análogo, arte botánico y medios mixtos (Ejemplo: Mila González, Coquimbo, Chile).** Incluye un área administrativa 100% privada (`/admin`), backend en Supabase, canal de imágenes optimizado con Cloudinary y un test suite completo en Vitest.

---

## 📋 Tabla de Contenidos

- [Visión General & Propósito](#-visión-general--propósito)
- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Decisiones de Diseño & UI/UX](#-decisiones-de-diseño--uiux)
- [Arquitectura de Software & Clean Code](#-arquitectura-de-software--clean-code)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación & Configuración Local](#-instalación--configuración-local)
- [Configuración de Supabase & Cloudinary](#-configuración-de-supabase--cloudinary)
- [Panel Administrativo Privado (`/admin`)](#-panel-administrativo-privado-admin)
- [Scripts & Test Coverage](#-scripts--test-coverage)
- [Despliegue en Netlify](#-despliegue-en-netlify)

---

## 🌟 Visión General & Propósito

Esta plantilla fue concebida como un producto **listo para producción (production-ready)** para ofrecer a clientes del rubro artístico (ilustradoras, diseñadoras, artistas visuales, fotógrafas y collagistas) que requieren un sitio web elegante, accesible, ultra-rápido en carga y fácil de actualizar sin tocar código.

### Secciones Integradas:
1. **Hero Header:** Presentación conceptual con badge de disciplina y llamada a la acción.
2. **Biografía & Trayectoria (`#bio`):** Perfil de Mila González (Coquimbo, Chile), credenciales, experiencia y especialidades.
3. **Statement Artístico (`#statement`):** Manifiesto poético y filosofía de la técnica de collage.
4. **Series & Obras (`#series`):** Galería minimalista de colecciones con técnica, año y dimensiones.
5. **Talleres & Masterclasses (`#talleres`):** Oferta formativa presencial/online con itinerario y reserva.
6. **Kit de Collage & Recurso (`#kit`):** Catálogo de herramientas, paquetes de papeles vintage y guías digitales.
7. **Contacto & Redes (`#contacto`):** Formulario con validación Zod en tiempo real, teléfono chileno (+56 9), ubicación en Coquimbo e íconos de redes sociales.
8. **Área Privada (`/admin`):** Ruta de administración **totalmente privada y oculta** del público (acceso manual tipeando la URL).

---

## 🎨 Decisiones de Diseño & UI/UX

- **Minimalismo de Alto Contraste:** Fondo claro/cálido (`#FBF9F5`) y tipografía en carbón profundo (`#1A1918`). Esta decisión evita la saturación visual y permite que los colores y texturas de las obras de collage sean las verdaderas protagonistas.
- **Sin Precios en la Vista Pública:** Se han removido los precios visuales del sitio público para enfocarse en la propuesta artística y la consulta directa.
- **Acceso Privado Oculto:** No existe ningún botón o enlace en la navegación o pie de página hacia el `/admin`. Solo la artista/diseñadora conoce la URL para ingresar.
- **Paleta de Color Orgánica:**
  - **Fondo Primario:** Warm Off-White (`#FBF9F5`)
  - **Fondo Secundario:** Muted Sand (`#F4F0E8`)
  - **Acento Principal:** Terracota Cálido (`#C85A32`)
  - **Acento Botánico:** Verde Sage Seco (`#6E7E6B`)
- **Tipografía Editorial:**
  - **Títulos & Citas:** *Playfair Display* (Serif elegante de corte editorial).
  - **Cuerpo de Texto & Botones:** *Inter* (Sans-serif limpia y legible para lectura extendida).

---

## 🧠 Arquitectura de Software & Clean Code

- **Patrón Repository (Content Store):** `src/lib/contentStore.ts` abstrae las llamadas a la base de datos de Supabase. Si las variables de entorno de Supabase no están configuradas en local, el sistema conmuta automáticamente a un **estado en memoria con datos pre-sembrados**, lo que permite previsualizar y probar la aplicación sin requerir credenciales externas.
- **Validación con Zod:** Todos los formularios e ingresos de datos (login admin, mensaje de contacto, edición de obras y talleres) están estrictamente tipados y validados mediante esquemas Zod en `src/lib/schemas/`.
- **SEO de Grado Profesional & Schema.org:** Inserción automática de metadatos OpenGraph, Twitter Cards y datos estructurados JSON-LD (`Person`, `VisualArtwork`, `EducationEvent`, `Product`) en `src/lib/seo.ts`.
- **Pipeline de Imágenes con Cloudinary:** `src/lib/cloudinary.ts` formatea automáticamente imágenes a formatos web de última generación (WebP / AVIF), aplicando transformaciones de calidad (`q_auto`) y dimensiones según la pantalla del visitante.

---

## 📁 Estructura del Proyecto

```text
collage-sitio-web/
├── public/                     # Imágenes SVG de placeholder para collage y artista
├── src/
│   ├── components/
│   │   ├── admin/              # Panel interactivo y formulario de login admin
│   │   ├── layout/             # Header, Footer, Seo y Navegación
│   │   ├── sections/           # Secciones semánticas de la landing page
│   │   └── ui/                 # Componentes reusables (Button, Card, Badge, Modal, Toast)
│   ├── lib/
│   │   ├── schemas/            # Esquemas de validación Zod (bio, series, talleres, contact, auth)
│   │   ├── cloudinary.ts       # Generador de URLs optimizadas de Cloudinary
│   │   ├── contentStore.ts     # Repositorio de datos con fallback automático
│   │   ├── seo.ts              # Generador de metadatos y esquemas JSON-LD
│   │   └── supabase.ts         # Cliente Supabase tipado
│   ├── pages/
│   │   ├── api/                # Endpoints serverless (/api/auth, /api/contact, /api/content)
│   │   ├── admin/              # Rutas protegidas /admin y /admin/login
│   │   ├── index.astro         # Landing page principal
│   │   └── 404.astro           # Página de error 404 personalizada
│   └── styles/                 # Estilos globales y variables CSS de la paleta
├── supabase/
│   └── schema.sql              # Script SQL para tablas PostgreSQL y políticas RLS
├── tests/
│   ├── unit/                   # Pruebas unitarias (schemas, store, seo, cloudinary, react components)
│   ├── integration/            # Pruebas de integración para las API Routes
│   └── setup.ts                # Configuración inicial de Vitest
├── astro.config.mjs            # Configuración de Astro 5 + Netlify + React + Sitemap
├── netlify.toml                # Configuración de despliegue en Netlify (Headers & Redirects)
├── vitest.config.ts            # Configuración de Vitest con proveedor v8
├── package.json
└── README.md
```

---

## ⚡ Instalación & Configuración Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/collage-sitio-web.git
cd collage-sitio-web

# 2. Instalar dependencias con pnpm
pnpm install

# 3. Crear archivo de variables de entorno local
cp .env.example .env

# 4. Iniciar el servidor de desarrollo
pnpm dev
```

Navega a `http://localhost:4321` para ver la landing page en vivo.

---

## 🔐 Panel Administrativo Privado (`/admin`)

El acceso administrativo es **100% privado y confidencial**. No existen hipervínculos ni botones en la vista pública del sitio web.

Para acceder al panel de control:
1. Navega manualmente tipeando la ruta `/admin` en la barra de direcciones de tu navegador (ejemplo: `http://localhost:4321/admin` o `https://tu-dominio.com/admin`).
2. Ingresa utilizando las credenciales configuradas en tus variables de entorno (`ADMIN_EMAIL` y `ADMIN_PASSWORD`), tal como se detalla en el archivo [`.env.example`](file:///.env.example).

---

## 🧪 Scripts & Test Coverage

```bash
# Ejecutar verificación de tipos TypeScript y Astro check
pnpm typecheck

# Ejecutar suite de pruebas unitarias e integración
pnpm test

# Generar reporte completo de cobertura de código
pnpm test:coverage
```

---

### ✒️ Licencia & Créditos

Desarrollado como plantilla profesional por Celvadev. Libre para uso comercial en proyectos de clientes.
