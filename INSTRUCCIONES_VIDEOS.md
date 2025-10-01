# 🎬 Instrucciones para Gestionar Videos

## Cómo Acceder al Editor de Videos

1. **Iniciar Sesión**: Ve a tu sitio web y haz clic en "Admin" en la esquina superior derecha
2. **Ingresa tus credenciales**: Usa tu usuario y contraseña de administrador
3. **Accede al Dashboard**: Una vez autenticado, verás el panel de administración
4. **Selecciona Videos**: Haz clic en la tarjeta "🎬 Videos" en la sección "Gestionar Secciones"

## Tipos de Videos Soportados

### 📺 Videos de YouTube
- **URLs soportadas**:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `https://www.youtube.com/embed/VIDEO_ID`
- **Ventajas**: No ocupan espacio en tu servidor, carga rápida
- **Desventajas**: Depende de YouTube, puede ser bloqueado por ad-blockers

### 🎥 Videos Locales (MP4)
- **Formatos soportados**: MP4, WebM, OGG
- **Tamaño máximo**: 5MB por defecto (configurable)
- **Ventajas**: Control total, no depende de servicios externos
- **Desventajas**: Ocupan más espacio, carga más lenta

## Cómo Agregar Videos

### Método 1: Video de YouTube
1. Ve a YouTube y copia la URL del video
2. En el editor de videos, haz clic en "➕ Nuevo Video"
3. Completa los campos:
   - **Título**: Nombre del video
   - **URL de YouTube**: Pega la URL copiada
   - **Descripción**: Descripción opcional
   - **⭐ Video Destacado**: Marca si quieres que aparezca primero
4. Haz clic en "💾 Guardar Video"

### Método 2: Video Local
1. En el editor de videos, haz clic en "➕ Nuevo Video"
2. Completa el título y descripción
3. En la sección "Video Local (MP4)":
   - Haz clic en "📁 Seleccionar Video" o arrastra el archivo
   - Selecciona un archivo MP4 de tu computadora
   - El video se convertirá automáticamente a base64
4. Haz clic en "💾 Guardar Video"

## Funcionalidades del Editor

### ✏️ Editar Video Existente
- Haz clic en "✏️ Editar" en cualquier video de la lista
- Modifica título, descripción, URL o archivo
- Cambia entre YouTube y video local según necesites

### ⭐ Destacar Video
- Haz clic en "⭐ Destacar" para que aparezca primero en la sección
- Solo un video puede estar destacado a la vez

### 🗑️ Eliminar Video
- Haz clic en "🗑️ Eliminar" y confirma la acción
- El video se eliminará permanentemente

### 💾 Guardar Cambios
- Haz clic en "💾 Guardar Cambios" para persistir todas las modificaciones
- Los cambios se guardan en localStorage del navegador

## Vista Previa
- El editor incluye una vista previa en tiempo real
- Puedes ver cómo se verá el video antes de guardar
- Los videos de YouTube muestran el iframe embebido
- Los videos locales muestran el reproductor HTML5

## Solución de Problemas

### ❌ Error al cargar video de YouTube
**Causas posibles**:
- Bloqueador de anuncios activo
- Video privado o eliminado
- Problemas de conexión

**Soluciones**:
- Desactiva temporalmente el bloqueador de anuncios
- Verifica que el video sea público
- Usa el enlace "🔗 Ver en YouTube" como alternativa

### ❌ Error al cargar video local
**Causas posibles**:
- Archivo corrupto
- Formato no soportado
- Tamaño excesivo

**Soluciones**:
- Verifica que el archivo sea MP4 válido
- Reduce el tamaño del video
- Intenta con otro archivo

### 🔄 Videos no se muestran en el sitio
**Verificaciones**:
- Asegúrate de haber guardado los cambios
- Recarga la página del sitio web
- Verifica que los videos estén marcados como activos

## Consejos de Uso

### 📱 Optimización para Móviles
- Los videos locales pueden ser pesados en móviles
- Considera usar YouTube para mejor compatibilidad móvil
- Mantén los videos locales bajo 5MB

### 🎯 Mejores Prácticas
- Usa títulos descriptivos y atractivos
- Agrega descripciones que complementen el video
- Destaca solo el video más importante
- Mantén un equilibrio entre videos de YouTube y locales

### 🔒 Seguridad
- Los videos locales se almacenan en base64 en localStorage
- Los datos persisten entre sesiones del navegador
- Para mayor seguridad, considera usar un servidor de archivos

## Soporte Técnico

Si tienes problemas con el sistema de videos:
1. Verifica la consola del navegador (F12) para errores
2. Asegúrate de que JavaScript esté habilitado
3. Prueba con diferentes navegadores
4. Contacta al soporte técnico con detalles específicos del error

---

**¡Disfruta gestionando tus videos! 🎬✨**
