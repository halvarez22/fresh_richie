# 🚀 Guía de Despliegue - Fresh Richie Portfolio

## 📋 CHECKLIST COMPLETO

### ✅ PASO 1: Configurar Firebase (TU TAREA)

1. **Crear proyecto Firebase:**
   - Ve a https://console.firebase.google.com/
   - Clic en "Crear proyecto"
   - Nombre: `fresh-richie-portfolio`
   - Habilitar Google Analytics (opcional)

2. **Configurar Firestore:**
   - En el menú lateral: "Firestore Database"
   - Clic "Crear base de datos"
   - Modo: "Empezar en modo de prueba" (por ahora)
   - Ubicación: "us-central1" (recomendado)

3. **Configurar Authentication:**
   - En el menú lateral: "Authentication"
   - Pestaña "Sign-in method"
   - Habilitar "Correo electrónico/contraseña"

4. **Obtener credenciales:**
   - En "Configuración del proyecto" (ícono engrane)
   - Pestaña "General"
   - Sección "Tus apps" → "Agregar app" → Web
   - Registrar app con nombre: `fresh-richie-web`
   - **COPIAR las credenciales que aparecen**

### ✅ PASO 2: Configurar Variables de Entorno

1. **Crear archivo `.env.local`:**
   ```bash
   # En la raíz del proyecto
   cp .env.example .env.local
   ```

2. **Completar con tus credenciales de Firebase:**
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyC...
   VITE_FIREBASE_AUTH_DOMAIN=fresh-richie-portfolio.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=fresh-richie-portfolio
   VITE_FIREBASE_STORAGE_BUCKET=fresh-richie-portfolio.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   VITE_USE_FIREBASE=true
   ```

### ✅ PASO 3: Instalar Dependencias

```bash
# Instalar Firebase
npm install firebase

# O si prefieres usar el package.json preparado
cp package-firebase.json package.json
npm install
```

### ✅ PASO 4: Configurar Reglas de Firestore

En Firebase Console → Firestore → Reglas, usar:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura pública del contenido
    match /fresh-richie-content/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### ✅ PASO 5: Preparar para GitHub

1. **Crear .gitignore actualizado:**
   ```gitignore
   # Environments
   .env.local
   .env.production
   
   # Firebase
   .firebase/
   firebase-debug.log
   firestore-debug.log
   
   # Build
   dist/
   node_modules/
   ```

2. **Verificar archivos importantes:**
   - ✅ `src/config/firebase.ts`
   - ✅ `src/services/firebaseService.ts`
   - ✅ `src/hooks/useFirebaseContent.ts`
   - ✅ `.env.example`
   - ✅ `DEPLOYMENT_GUIDE.md`

### ✅ PASO 6: Configurar Vercel

1. **Variables de entorno en Vercel:**
   - Ve a tu proyecto en Vercel Dashboard
   - Settings → Environment Variables
   - Agregar TODAS las variables de `.env.local`:
     ```
     VITE_FIREBASE_API_KEY = tu_api_key
     VITE_FIREBASE_AUTH_DOMAIN = tu_auth_domain
     VITE_FIREBASE_PROJECT_ID = tu_project_id
     VITE_FIREBASE_STORAGE_BUCKET = tu_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID = tu_sender_id
     VITE_FIREBASE_APP_ID = tu_app_id
     VITE_USE_FIREBASE = true
     ```

2. **Configurar Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### ✅ PASO 7: Subir a GitHub

```bash
# Agregar todos los archivos
git add .

# Commit con mensaje descriptivo
git commit -m "feat: implement Firebase integration with real-time persistence

- Add Firebase configuration and services
- Implement useFirebaseContent hook with fallback to localStorage
- Add real-time synchronization
- Include comprehensive error handling and offline support
- Prepare for production deployment with environment variables"

# Push al repositorio existente
git push origin main
```

### ✅ PASO 8: Verificar Despliegue

1. **Verificar build en Vercel:**
   - Debe completarse sin errores
   - Verificar que las variables de entorno estén configuradas

2. **Probar funcionalidad:**
   - ✅ Navegación funciona correctamente
   - ✅ Videos se cargan bajo demanda
   - ✅ Panel de administración accesible
   - ✅ Datos se guardan en Firebase
   - ✅ Sincronización en tiempo real

## 🔧 COMANDOS ÚTILES

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Verificar Firebase connection
# (se puede hacer desde el DataManager en la app)
```

## 🚨 TROUBLESHOOTING

### Error: "Firebase not initialized"
- Verificar que `.env.local` existe y tiene todas las variables
- Verificar que las credenciales son correctas

### Error: "Permission denied"
- Verificar reglas de Firestore
- Verificar que Authentication está habilitado

### Error en Vercel build
- Verificar que todas las variables de entorno están en Vercel
- Verificar que `package.json` incluye Firebase

## 📞 SOPORTE

Si tienes problemas:
1. Revisar logs en Vercel Dashboard
2. Revisar Console de Firebase
3. Usar el DataManager en la app para diagnosticar
4. Verificar Network tab en DevTools del navegador

## 🎉 ¡LISTO!

Una vez completados todos los pasos, tendrás:
- ✅ Persistencia real en Firebase
- ✅ Sincronización en tiempo real
- ✅ Fallback a localStorage si Firebase falla
- ✅ Sistema de backup automático
- ✅ Despliegue automático desde GitHub
- ✅ Variables de entorno seguras