# 🚀 Guía de Despliegue - Fresh Richie Portfolio

## 📋 **PASO 1: SUBIR A GITHUB**

### **1.1 Crear Repositorio en GitHub**
1. Ve a: https://github.com/new
2. **Nombre del repositorio:** `fresh-richie-portfolio`
3. **Descripción:** "Official portfolio website for Mexican artist Fresh Richie"
4. **Visibilidad:** Public
5. **NO marcar** "Add a README file" (ya tenemos uno)
6. **NO marcar** "Add .gitignore" (ya tenemos uno)
7. **NO marcar** "Choose a license"
8. **Clic en "Create repository"**

### **1.2 Conectar Repositorio Local con GitHub**
```bash
# Agregar el repositorio remoto (reemplaza TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/fresh-richie-portfolio.git

# Cambiar a la rama main
git branch -M main

# Subir el código
git push -u origin main
```

## 🌐 **PASO 2: DESPLEGAR EN VERCEL**

### **2.1 Crear Cuenta en Vercel**
1. Ve a: https://vercel.com
2. **Clic en "Sign Up"**
3. **Selecciona "Continue with GitHub"**
4. **Autoriza** la conexión con GitHub

### **2.2 Importar Proyecto**
1. **Clic en "New Project"**
2. **Selecciona** el repositorio `fresh-richie-portfolio`
3. **Clic en "Import"**

### **2.3 Configurar Despliegue**
- **Framework Preset:** Vite
- **Root Directory:** `./` (por defecto)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### **2.4 Variables de Entorno (Si las hay)**
- **No necesarias** para este proyecto
- **Clic en "Deploy"**

## ✅ **PASO 3: VERIFICAR DESPLIEGUE**

### **3.1 URL del Sitio**
- Vercel te dará una URL como: `https://fresh-richie-portfolio-xxx.vercel.app`
- **El sitio estará disponible** en unos minutos

### **3.2 Verificar Funcionalidades**
- ✅ **Página principal** carga correctamente
- ✅ **Imágenes** se muestran
- ✅ **Videos de YouTube** funcionan
- ✅ **Enlaces de Spotify** funcionan
- ✅ **Navegación** funciona en móvil y desktop

## 🔄 **PASO 4: ACTUALIZACIONES FUTURAS**

### **4.1 Hacer Cambios**
```bash
# Hacer cambios en el código
# Luego:
git add .
git commit -m "Descripción del cambio"
git push origin main
```

### **4.2 Despliegue Automático**
- **Vercel detecta** los cambios automáticamente
- **Redespliega** el sitio en 1-2 minutos
- **No necesitas** hacer nada más

## 📱 **PASO 5: DOMINIO PERSONALIZADO (OPCIONAL)**

### **5.1 Agregar Dominio**
1. **Ve a** el proyecto en Vercel
2. **Settings** → **Domains**
3. **Agrega** tu dominio personalizado
4. **Configura** los DNS según las instrucciones

## 🎯 **RESULTADO FINAL**

- ✅ **Sitio en vivo** en Vercel
- ✅ **Código en GitHub** para versionado
- ✅ **Despliegue automático** en cada cambio
- ✅ **URL pública** para compartir
- ✅ **Performance optimizada** por Vercel

## 🆘 **SOLUCIÓN DE PROBLEMAS**

### **Error de Build**
- Verifica que `npm run build` funcione localmente
- Revisa los logs en Vercel

### **Imágenes no cargan**
- Verifica que las rutas sean correctas
- Asegúrate de que las imágenes estén en `public/`

### **Videos no funcionan**
- Verifica que los enlaces de YouTube sean correctos
- Asegúrate de que los videos sean públicos

---

**¡Tu portafolio de Fresh Richie estará en línea en minutos!** 🎵✨
