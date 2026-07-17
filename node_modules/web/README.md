# PETCARE AI: Plataforma B2B2C de Salud Animal

PETCARE AI es una plataforma moderna y centralizada diseñada para revolucionar el cuidado de mascotas al conectar dueños (B2C) y clínicas veterinarias (B2B) a través de un ecosistema inteligente potenciado por IA generativa de Google Gemini.

## 🚀 Hitos del Desarrollo (Roadmap Cumplido)

Durante nuestro desarrollo, hemos cubierto con éxito el 100% de la hoja de ruta inicial:

1. **Configuración Base (Vite + React + TailwindCSS):** 
   - Se estableció la estructura modular en un monorepo simulado (`apps/web`).
   - Se instalaron íconos (Lucide React) y librerías modernas de UI.

2. **Gestión de Estado y Enrutamiento (React Router + Zustand):**
   - Sistema de rutas para B2C (`/owner`), B2B (`/vet`) y Administrador (`/admin`).
   - Estado centralizado con `authStore`, `medicalRecordStore`, `petStore`, etc.

3. **Autenticación, Base de Datos y Seguridad (Supabase):**
   - Integración completa de autenticación (Email/Contraseña) para 3 roles: Owner, Clinic, Admin.
   - Creación de tablas de bases de datos relacionales (`users`, `posts`, etc.).
   - Implementación de políticas RLS (Row Level Security) para protección de datos en la nube.

4. **Desarrollo Frontend Multi-rol:**
   - **Módulo B2C (Dueños):** Panel para registrar mascotas, visualizar carnet virtual y acceder a la comunidad.
   - **Módulo B2B (Clínicas):** Agenda de pacientes y "Sala de Atención" para ingreso inmutable de fichas clínicas.
   - **Módulo Admin (God Mode):** Dashboard analítico oscuro ("Dark Mode") para revisión métricas y usuarios.

5. **Integración de Inteligencia Artificial (Google Gemini):**
   - Desarrollo del componente **Triaje IA**: Evalúa síntomas en tiempo real ingresados por dueños.
   - Desarrollo del componente **Asistente Clínico IA**: Sugiere diagnósticos diferenciales a los veterinarios basándose en datos vitales (Temperatura, FC, FR).

6. **Comunidad y Engagement:**
   - Foro B2C conectado en tiempo real a Supabase para intercambiar consejos y experiencias.

7. **Despliegue a Producción (Vercel):**
   - Solución de problemas SPA (404 Rewrites mediante `vercel.json`).
   - Conexión de variables de entorno para usar la base de datos real.
   - Vinculación exitosa con el dominio personalizado: `petcare.bastiascid.cl`.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18 (Vite), TypeScript, TailwindCSS v3.
- **Enrutamiento:** React Router DOM v6.
- **Estado Global:** Zustand.
- **Backend as a Service (BaaS):** Supabase (Auth, PostgreSQL Database, RLS).
- **Inteligencia Artificial:** Google Generative AI (Gemini Flash).
- **Despliegue y Hosting:** Vercel (Edge Network).

## ⚙️ Guía de Implementación Local

Para correr el proyecto en una máquina de desarrollo local, sigue estos pasos:

1. **Clonar e instalar dependencias:**
   ```bash
   cd apps/web
   npm install
   ```

2. **Configurar Variables de Entorno:**
   Crea un archivo `.env.local` en la raíz de `apps/web` con las siguientes llaves:
   ```env
   VITE_SUPABASE_URL="https://[TU-URL-SUPABASE].supabase.co"
   VITE_SUPABASE_ANON_KEY="sb_publishable_[TU-ANON-KEY]"
   VITE_GEMINI_API_KEY="[TU-GEMINI-KEY]"
   ```

3. **Ejecutar el Servidor de Desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación correrá en `http://localhost:5173`.

## 🔒 Arquitectura de Roles

- **OWNER (Dueños de mascotas):** Acceso al registro de perfiles animales, triaje AI y comunidad pública.
- **CLINIC (Veterinarias):** Acceso al directorio de pacientes, inserción de historial clínico inmutable (basado en blockchain conceptual) y asistencia de diagnóstico.
- **ADMIN (Dios):** Acceso total a analíticas, gestión de la plataforma y configuraciones maestras.

---
*Documentación generada automáticamente por PetCare AI Development Agent.*
