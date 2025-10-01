# Firebase Configuration Setup

## Paso 1: Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Sigue los pasos para configurar tu proyecto

## Paso 2: Habilitar Firebase Storage

1. En el panel izquierdo, haz clic en "Storage"
2. Haz clic en "Comenzar"
3. Selecciona "Probar en modo de prueba" (para desarrollo)
4. Elige una ubicación para tu bucket

## Paso 3: Obtener configuración

1. Ve a "Configuración del proyecto" (ícono de engranaje)
2. Haz clic en "Configuración general"
3. Desplázate hacia abajo hasta "Tus aplicaciones"
4. Haz clic en "Web" (ícono </>)
5. Registra tu app con un nombre (ej: "fresh-richie-web")
6. Copia la configuración de Firebase

## Paso 4: Actualizar configuración

Reemplaza los valores en `src/firebase/config.ts`:

```typescript
const firebaseConfig = {
  apiKey: "tu-api-key-real",
  authDomain: "tu-proyecto-real.firebaseapp.com",
  projectId: "tu-proyecto-real-id",
  storageBucket: "tu-proyecto-real.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id-real"
};
```

## Paso 5: Configurar reglas de Storage (Opcional)

En Firebase Console > Storage > Reglas:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Permitir lectura pública
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Permitir escritura solo con autenticación (opcional)
    match /{allPaths=**} {
      allow write: if true; // Para desarrollo
      // allow write: if request.auth != null; // Para producción
    }
  }
}
```

## Estructura de carpetas en Storage

Las imágenes se organizarán así:
- `events/` - Imágenes de eventos
- `news/` - Imágenes de noticias  
- `music/` - Portadas de álbumes
- `biography/` - Imágenes de perfil
- `gallery/` - Imágenes de galería

## Fallback a Base64

Si Firebase no está configurado o falla, el sistema automáticamente usará base64 como respaldo, así que la aplicación seguirá funcionando.
