# 💕 Una Cita Especial

Una aplicación web romántica para pedirle a alguien que salga contigo. Construida con Next.js 16, TypeScript, Tailwind CSS y Supabase.

## ✨ Características

- **Flujo interactivo**: Calendario → Pregunta de cita → Selección de comida → Selección de hora → Confirmación
- **Diseño minimalista y elegante**: Gradientes suaves, animaciones orgánicas y tipografía moderna
- **Fotos personalizadas**: Espacios reservados para fotos en cada página
- **Experiencia móvil-first**: Optimizada para dispositivos móviles
- **Backend con Supabase**: Almacena las respuestas de la cita
- **Tres canciones embebidas** de Spotify en la página final
- **Dashboard de admin** para ver todas las respuestas

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

✅ **Backend ya creado automáticamente!**

La base de datos y tabla ya están configuradas. Solo necesitas crear el archivo `.env.local` con estas credenciales:

```bash
# Crea el archivo .env.local en la raíz del proyecto
NEXT_PUBLIC_SUPABASE_URL=https://dwrelwshzrdhqzkqzoek.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3cmVsd3NoenJkaHF6a3F6b2VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MTY4MzIsImV4cCI6MjA3OTQ5MjgzMn0.4u6Qkw925g-ns9QuWvUKTlxGz9p0AltYEj_CIAtjA-0
```

**Tabla creada automáticamente:**
- `date_requests` con todas las columnas necesarias
- RLS habilitado con políticas de acceso
- Lista para recibir respuestas de tu cita

### 3. Agregar fotos

Coloca tus fotos en la carpeta `/public/`:
- `foto-principal.jpg` - Foto principal de ella
- `recuerdo-1.jpg`, `recuerdo-2.jpg` - Fotos de recuerdos
- `comida.jpg` - Foto relacionada con comida
- `cita.jpg` - Foto de una cita
- `especial.jpg` - Foto especial
- `feliz.jpg` - Foto feliz
- `juntos.jpg` - Foto de ustedes juntos

### 4. Ejecutar la aplicación

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📱 Flujo de la Aplicación

1. **Inicio**: Calendario para recordar cuándo se conocieron (validación: 27/06/2025)
2. **Pregunta**: "¿Quieres salir conmigo el sábado 29 de noviembre?"
3. **Comida**: Sushi 🍱, Pizza 🍕 o Comida Mexicana 🌮
4. **Hora**: Selección de horario (12:00 - 17:00)
5. **Confirmación**: Tres embeds de Spotify + resumen final

## 👨‍💻 Dashboard de Admin

Para ver todas las respuestas de tu cita especial, visita:
```
http://localhost:3000/admin
```

Este dashboard muestra:
- 📊 Estadísticas generales (total de respuestas, confirmaciones, etc.)
- 📋 Tabla con todas las respuestas recibidas
- 🎵 Tres canciones embebidas de Spotify
- 📅 Fechas y horas de creación

**Nota**: Asegúrate de tener configuradas las variables de entorno de Supabase.

## 🎨 Personalización

### Colores
Los gradientes se pueden personalizar en cada página:
- Inicio: Rosa a púrpura
- Pregunta: Rosa a púrpura
- Comida: Naranja a amarillo
- Hora: Azul a índigo
- Confirmación: Púrpura a rosa

### Animaciones
Fondo con animaciones orgánicas usando gradientes radiales y efectos de "respiración".

### Música
Tres canciones embebidas de Spotify en la página final.

## 🛠️ Tecnologías

- **Next.js 16** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Supabase** - Backend y base de datos
- **React DatePicker** - Selector de fechas
- **Spotify Embeds** - Reproducción integrada

## 📦 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Ejecutar ESLint

## 🚀 Despliegue

### Netlify (Recomendado)

1. Conecta tu repositorio de GitHub a Netlify
2. **Configuración automática**: El archivo `netlify.toml` ya está configurado
3. Agrega las variables de entorno de Supabase en Build Settings:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://dwrelwshzrdhqzkqzoek.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3cmVsd3NoenJkaHF6a3F6b2VrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MTY4MzIsImV4cCI6MjA3OTQ5MjgzMn0.4u6Qkw925g-ns9QuWvUKTlxGz9p0AltYEj_CIAtjA-0
   ```
4. Despliega automáticamente

**Características del despliegue:**
- ✅ Exportación estática configurada
- ✅ SPA routing con redirects automáticos
- ✅ Todas las rutas funcionan correctamente
- ✅ Build optimizado para producción

### Vercel (Alternativa)

1. Conecta tu repositorio de GitHub a Vercel
2. Agrega las variables de entorno de Supabase
3. Despliega automáticamente

### Otro proveedor

Asegúrate de configurar las variables de entorno y construir con `npm run build`.

## 💝 Notas Personales

Esta aplicación está diseñada para ser especial y memorable. Recuerda:
- Personalizar las fotos con momentos reales
- Las canciones están embebidas directamente desde Spotify
- El diseño es minimalista para que las fotos y la música sean protagonistas
- Validación estricta de fecha (27/06/2025) para acceso exclusivo

¡Que tengas una cita increíble! 🎉